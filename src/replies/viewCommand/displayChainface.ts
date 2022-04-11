import { CommandInteraction, MessageAttachment, MessageEmbed } from "discord.js";
import { ethers } from "ethers";
import nodeHtmlToImage = require("node-html-to-image");
import { abi } from "../../utilities/abi"
import { contractAddress, maximumIndex } from "../../utilities/dotenv";

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

export async function displayChainface(interaction: CommandInteraction, id: number) {
    
    if (id < 0 || id > maximumIndex) {
        return await interaction.reply({ content: "No Chainface under this number." });
    }
    interaction.deferReply();
    const provider = ethers.getDefaultProvider();
    const contract = new ethers.Contract(contractAddress, abi, provider);
    const svg = await contract.renderSvg(id);

    const html = buildTheHTML(svg);

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
        .setTitle(`Chainface #${id}`)
        .setURL(`https://opensea.io/assets/${contractAddress}/${id}`)
        .setImage("attachment://Image.png");

    interaction.editReply({ embeds: [embed], files: [file] });
}