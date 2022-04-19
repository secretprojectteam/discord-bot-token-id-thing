import { CommandInteraction, Constants } from "discord.js";
import { Command } from "../datamodel/Command";
import { displayChainface } from "../replies/viewCommand/displayChainface";
import { maximumIndex } from "../utilities/dotenv";

export const ViewCommand: Command = {
    name: "view",
    description: "View a chainface in discord.",
    defaultPermission: true,
    options: [
        {
            name: "specific",
            description: "View a specific chainface.",
            type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
            options: [
                {
                    name: "number",
                    description: "The number of the Chainface you want to display.",
                    type: Constants.ApplicationCommandOptionTypes.INTEGER,
                    required: true
                }
            ]
        },
        {
            name: "random",
            description: "View a random chainface.",
            type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND
        }
    ],
    permissions: async () => { return []; },
    execute: async (interaction: CommandInteraction) => {

        if (interaction.options.getSubcommand() === "specific") {
            const chainfaceNumber = interaction.options.getInteger("number");
            if (chainfaceNumber !== 0 && !chainfaceNumber) {
                return await interaction.reply({ content: "Please provide a valid chainface number.", ephemeral: true });
            }
            if (chainfaceNumber < 0 || chainfaceNumber > maximumIndex) {
                return await interaction.reply({ content: "No Chainface under this number.", ephemeral: true });
            }
            displayChainface(interaction, chainfaceNumber);
        } else if (interaction.options.getSubcommand() === "random") {
            const randomNumber = Math.floor(Math.random() * (maximumIndex + 1))
            displayChainface(interaction, randomNumber);
        } else {
            return await interaction.reply({ 
                content: "This did not work. But why? Do you know it? Because I do not.", 
                ephemeral: true 
            });
        }

        
    }
};