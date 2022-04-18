import {  
    ApplicationCommandPermissionData, 
    ChatInputApplicationCommandData,
    CommandInteraction,
    Guild 
} from "discord.js";

export interface Command extends ChatInputApplicationCommandData {
    permissions: (guild: Guild) => Promise<ApplicationCommandPermissionData[]>
    execute: (interaction: CommandInteraction) => void
}