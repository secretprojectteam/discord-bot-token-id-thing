import { CommandInteraction } from "discord.js";
import { cFContractAddress, maximumCFIndex } from "../../utilities/dotenv";
import { displaySVG } from "./displaySVG";
import fetch from "node-fetch";

export async function displayCF(interaction: CommandInteraction, id: number) {
    if (id < 0 || id > maximumCFIndex) {
        return await interaction.reply({ content: "No CFA under this number.", ephemeral: true });
    }
    interaction.deferReply();
    const fetchUrl = `https://chainfacesrinkeby.azurewebsites.net/api/HttpTrigger?id=${id}`;
    const result = await fetch(fetchUrl);
    const jsonResult = await result.json();
    if (jsonResult) {
        const svg = jsonResult.image_data;
        const title = `CF #${id}`;
        const url = `https://opensea.io/assets/${cFContractAddress}/${id}`
        displaySVG(interaction, svg, title, url);
    } else {
        interaction.editReply({ 
            content: "Unable to fetch CF data. But why? Do you know it? Because I do not."
        });
    }
}