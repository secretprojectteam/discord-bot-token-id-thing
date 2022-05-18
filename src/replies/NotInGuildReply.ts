import { InteractionReplyOptions } from "discord.js";

export const NotInGuildReply: InteractionReplyOptions = {
    content: "This interaction is Guild-only, sorry :(.",
    ephemeral: true
};