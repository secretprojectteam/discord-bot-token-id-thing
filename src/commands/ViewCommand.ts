import { CommandInteraction, Constants, MessageAttachment, MessageEmbed } from "discord.js";
import { Command } from "../datamodel/Command";
import { ethers } from "ethers";
import nodeHtmlToImage = require("node-html-to-image");
import {abi} from "../utilities/abi"

function buildTheHTML(svg: string) {
    return `
<!DOCTYPE html>
<html lang="en">
    <head>
        <style>
        body { 
            width: 400px; 
        } 
        svg{
            width: 400px; 
            heigth: 400px;
        }
    </style>
    </head>
    <bod>
        ${svg}
    </bod>
</html>
`
}

const contractAddress = "0x93a796B1E846567Fe3577af7B7BB89F71680173a"

export const ViewCommand: Command = {
    name: "view",
    description: "View your chainface in discord.",
    defaultPermission: true,
    options: [
        {
            name: "number",
            description: "The number of the Chainface you want to display.",
            type: Constants.ApplicationCommandOptionTypes.INTEGER,
            required: true
        }
    ],
    permissions: async () => { return []; },
    execute: async (interaction: CommandInteraction) => {
        interaction.deferReply();

        const chainfaceNumer = interaction.options.getInteger("number");
        if (chainfaceNumer !== 0 && !chainfaceNumer) {
            return interaction.editReply({ content: "Please provide a valid chainface number." });
        }

        const provider = ethers.getDefaultProvider();
        const contract = new ethers.Contract(contractAddress, abi, provider);
        const totalSuppy = await contract.totalSupply();
        if (chainfaceNumer < 0 || chainfaceNumer > totalSuppy) {
            return interaction.editReply({ content: "No Chainface under this number." });
        }
        const svg = await contract.renderSvg(chainfaceNumer);

        const html = buildTheHTML(svg)

        const output = await nodeHtmlToImage({
            html: html,
            quality: 100,
            type: "png",
            puppeteerArgs: {
              args: ["--no-sandbox"],
            },
            encoding: "binary"
          }) as Buffer;

        const file = new MessageAttachment(output, "Image.png");

        const embed = new MessageEmbed()
        .setTitle(`Chainface #${chainfaceNumer}`)
        .setURL(`https://opensea.io/assets/${contractAddress}/${chainfaceNumer}`)
        .setImage("attachment://Image.png")

        interaction.editReply({ embeds: [embed], files: [file] });
    }
};