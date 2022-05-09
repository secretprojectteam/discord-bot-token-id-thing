import { CommandInteraction } from "discord.js";
import { NotInGuildReply } from "../replies/NotInGuildReply";
import { Command } from "../datamodel/Command";
import { makeLeaderboardReply } from "../replies/leaderboard/makeLeaderboardReply";
import { cFAContractAddress } from "../utilities/dotenv";

export enum SetupCommandNames {
    leaderboard = "leaderboard",
}

export const LeaderboardCommand: Command = {
    name: SetupCommandNames.leaderboard,
    description: "Show the leaderboard.",
    defaultPermission: true,
    permissions: async () => { return []; },
    execute: async (interaction: CommandInteraction) => {
        if (!interaction.inGuild()) return await interaction.reply(NotInGuildReply);

        const reply = await makeLeaderboardReply(cFAContractAddress, 0, 10);
        return await interaction.reply(reply);
    }
};