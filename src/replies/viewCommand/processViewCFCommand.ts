import { CommandInteraction } from "discord.js";
import { displayCF } from "./displayCF";
import { maximumCFIndex } from "../../utilities/dotenv";

export async function processViewCFCommand(interaction: CommandInteraction) {
    if (interaction.options.getSubcommand() === "specific") {
        const number = interaction.options.getInteger("number");
        if (number !== 0 && !number) {
            return await interaction.reply({ content: "Please provide a valid CF number.", ephemeral: true });
        }
        if (number < 0 || number > maximumCFIndex) {
            return await interaction.reply({ content: "No CF under this number.", ephemeral: true });
        }
        await displayCF(interaction, number);
    } else if (interaction.options.getSubcommand() === "random") {
        const randomNumber = Math.floor(Math.random() * (maximumCFIndex + 1))
        await displayCF(interaction, randomNumber);
    } else {
        return await interaction.reply({ 
            content: "This did not work. But why? Do you know it? Because I do not.", 
            ephemeral: true 
        });
    }
}