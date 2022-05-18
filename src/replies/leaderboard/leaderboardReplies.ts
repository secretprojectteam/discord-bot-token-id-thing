import { InteractionReplyOptions } from "discord.js";

export const LeaderboardNotReadyReply: InteractionReplyOptions = { 
    content: "The leaderboard is not yet ready, please try again later.", 
    ephemeral: true,
    embeds: [],
    components: []
};

export const EmptyLeaderboardReply: InteractionReplyOptions = {
    content: "There is not data to display.",
    ephemeral: true,
    embeds: [],
    components: []
};

export const UnableToBuildLeaderboardReply: InteractionReplyOptions = {
    content: "Unable to build the leaderboard reply.",
    ephemeral: true,
    embeds: [],
    components: []
};