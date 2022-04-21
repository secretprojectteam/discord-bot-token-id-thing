import { CommandInteraction, Constants } from "discord.js";
import { Command } from "../datamodel/Command";
import { processViewCFACommand } from "../replies/viewCommand/processViewCFACommand";
import { processViewCFCommand } from "../replies/viewCommand/processViewCFCommand";

export const ViewCommand: Command = {
    name: "view",
    description: "View a chainface in discord.",
    defaultPermission: true,
    options: [
        {
            name: "cfa",
            description: "View a CFA.",
            type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND_GROUP,
            options: [
                {
                    name: "specific",
                    description: "View a specific CFA.",
                    type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                    options: [
                        {
                            name: "number",
                            description: "The number of the CFA you want to display.",
                            type: Constants.ApplicationCommandOptionTypes.INTEGER,
                            required: true
                        }
                    ]
                },
                {
                    name: "random",
                    description: "View a random CFA.",
                    type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND
                }
            ]
        },
        {
            name: "cf",
            description: "View a CF.",
            type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND_GROUP,
            options: [
                {
                    name: "specific",
                    description: "View a specific CF.",
                    type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND,
                    options: [
                        {
                            name: "number",
                            description: "The number of the CF you want to display.",
                            type: Constants.ApplicationCommandOptionTypes.INTEGER,
                            required: true
                        }
                    ]
                },
                {
                    name: "random",
                    description: "View a random CF.",
                    type: Constants.ApplicationCommandOptionTypes.SUB_COMMAND
                }
            ]
        }
    ],
    permissions: async () => { return []; },
    execute: async (interaction: CommandInteraction) => {
        if (interaction.options.getSubcommandGroup() === "cfa") {
            processViewCFACommand(interaction);
        } else if (interaction.options.getSubcommandGroup() === "cf") {
            processViewCFCommand(interaction);
        } else {
            return await interaction.reply({ 
                content: "This did not work. But why? Do you know it? Because I do not.", 
                ephemeral: true 
            });
        }
    }
};