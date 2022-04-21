import { CommandInteraction } from "discord.js";
import { displayCFA } from "./displayCFA";
import { maximumCFAIndex } from "../../utilities/dotenv";

export async function processViewCFACommand(interaction: CommandInteraction) {
    if (interaction.options.getSubcommand() === "specific") {
        const number = interaction.options.getInteger("number");
        if (number !== 0 && !number) {
            return await interaction.reply({ content: "Please provide a valid CFA number.", ephemeral: true });
        }
        if (number < 0 || number > maximumCFAIndex) {
            return await interaction.reply({ content: "No CFA under this number.", ephemeral: true });
        }
        displayCFA(interaction, number);
    } else if (interaction.options.getSubcommand() === "random") {
        const randomNumber = Math.floor(Math.random() * (maximumCFAIndex + 1))
        displayCFA(interaction, randomNumber);
    } else {
        return await interaction.reply({ 
            content: "This did not work. But why? Do you know it? Because I do not.", 
            ephemeral: true 
        });
    }
}