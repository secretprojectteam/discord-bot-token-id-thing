import { CommandInteraction } from "discord.js";
import { ethers } from "ethers";
import { abi } from "../../utilities/abi"
import { cFAContractAddress, maximumCFAIndex } from "../../utilities/dotenv";
import { displaySVG } from "./displaySVG";

export async function displayCFA(interaction: CommandInteraction, id: number) {
    if (id < 0 || id > maximumCFAIndex) {
        return await interaction.reply({ content: "No CFA under this number.", ephemeral: true });
    }
    interaction.deferReply();
    const provider = ethers.getDefaultProvider();
    const contract = new ethers.Contract(cFAContractAddress, abi, provider);
    const svg = await contract.renderSvg(id);
    const title = `CFA #${id}`;
    const url = `https://opensea.io/assets/${cFAContractAddress}/${id}`
    displaySVG(interaction, svg, title, url);
}