import { Client, Constants } from "discord.js";
import { Event } from "../datamodel/Event";
import { fetchLeaderboardData } from "../replies/leaderboard/fetchLeaderboardData";
import { setGuildCommands } from "../setup/setGuildCommands";
import { cFAContractAddress } from "../utilities/dotenv";

export const ReadyEvent: Event = {
    name: Constants.Events.CLIENT_READY,
    once: true,
    execute: async(client: Client) => {
        if (!client.user || !client.application) {
            return;
        }
        
        client.guilds.cache.forEach((guild) => {
            setGuildCommands(guild);
        });

        fetchLeaderboardData(cFAContractAddress);

        console.log(`${client.user.username} is online.`);
    }
};
