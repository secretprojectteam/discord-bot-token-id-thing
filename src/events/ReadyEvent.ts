import { Client, Constants } from "discord.js";
import { Event } from "../datamodel/Event";
import { setGuildCommands } from "../setup/setGuildCommands";
import { fetchTotalSupply } from "../utilities/fetchTotalSupply";

export const ReadyEvent: Event = {
    name: Constants.Events.CLIENT_READY,
    once: true,
    execute: async(client: Client) => {
        if (!client.user || !client.application) {
            return;
        }

        fetchTotalSupply()
        
        client.guilds.cache.forEach((guild) => {
            setGuildCommands(guild);
        });

        console.log(`${client.user.username} is online.`);
    }
};
