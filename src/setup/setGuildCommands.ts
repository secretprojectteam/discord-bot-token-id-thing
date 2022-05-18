import { Guild } from "discord.js";
import { Command } from "../datamodel/Command";
import { Commands } from "../Commands";

export async function setGuildCommands(guild: Guild) {
    guild.commands.set(Commands);
        setTimeout(function() {
            setGuildCommandPermissions(guild, Commands);
        }, 30 * 1000);
}

async function setGuildCommandPermissions(guild: Guild, commands: Command[]) {
    // const guildCommands = await guild.commands.fetch();
    // for (const commandWithPermissions of commands.filter(command => command.defaultPermission !== true)) {
    //     const guildCommand = guildCommands.find(command => command.name === commandWithPermissions.name);
    //     if (guildCommand !== undefined) {
    //         const permissions = await commandWithPermissions.permissions(guild);
    //         guild.commands.permissions.set({
    //             command: guildCommand.id,
    //             permissions: permissions
    //         });
    //     }
    // }
}