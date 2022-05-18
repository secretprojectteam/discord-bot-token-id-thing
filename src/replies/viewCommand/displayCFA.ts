import { CommandInteraction } from "discord.js";
import { abi } from "../../utilities/abi"
import { cFAContractAddress, maximumCFAIndex } from "../../utilities/dotenv";
import { displaySVG } from "./displaySVG";

import {ethers} from "ethers";
import {provider} from "../../utilities/ethers";
const contract = new ethers.Contract(cFAContractAddress, abi, provider);

export async function displayCFA(interaction: CommandInteraction, id: number) {
    if (id < 0 || id > maximumCFAIndex) {
        return await interaction.reply({ content: "No CFA under this number.", ephemeral: true });
    }
    await interaction.deferReply();

    const svg = await contract.renderSvg(id);
    const title = `CFA #${id}`;
    const url = `https://opensea.io/assets/${cFAContractAddress}/${id}`
    await displaySVG(interaction, svg, title, url);
}