import { ButtonInteraction, InteractionReplyOptions, MessageActionRow, MessageButton } from "discord.js";
import { ButtonLabel } from "../../datamodel/Buttons";
import { cFAContractAddress } from "../../utilities/dotenv";
import { NotInGuildReply } from "../NotInGuildReply";
import { UnableToBuildLeaderboardReply } from "./leaderboardReplies";
import { makeLeaderboardReply } from "./makeLeaderboardReply";

export async function handleLeaderboardInteraction(interaction: ButtonInteraction) {
    if (!interaction.inGuild()) return await interaction.reply(NotInGuildReply);

    const contractAddress = cFAContractAddress;

    const actionRows = interaction.message.components as MessageActionRow[];
    const range = (actionRows[1].components[2] as MessageButton).label;
    let index = 0;
    let offset = 0;
    if (range !== null) {
        const numbers = range.split(" - ");
        index = parseInt(numbers[0]) - 1;
        offset = parseInt(numbers[1]) - index;
    }
    let isInOpenSeaMode = false;
    if (interaction.message.embeds.length > 0) {
        const description = interaction.message.embeds[0].description;
        if (description !== undefined && description !== null) isInOpenSeaMode = description.startsWith("#");
    }
    let reply: InteractionReplyOptions;

    switch (interaction.customId) {
        case ButtonLabel.ten:
            if (contractAddress !== undefined && range !== null) {
                reply = await makeLeaderboardReply(contractAddress, index, 10, isInOpenSeaMode);
            } else {
                reply = UnableToBuildLeaderboardReply;
            }
            break;

        case ButtonLabel.twenty:
            if (contractAddress !== undefined && range !== null) {
                reply = await makeLeaderboardReply(contractAddress, index, 20, isInOpenSeaMode);
            } else {
                reply = UnableToBuildLeaderboardReply;
            }
            break;

        case ButtonLabel.fifty:
            if (contractAddress !== undefined && range !== null) {
                reply = await makeLeaderboardReply(contractAddress, index, 50, isInOpenSeaMode);
            } else {
                reply = UnableToBuildLeaderboardReply;
            }
            break;

        case ButtonLabel.hundred:
            if (contractAddress !== undefined && range !== null) {
                reply = await makeLeaderboardReply(contractAddress, index, 100, isInOpenSeaMode);
            } else {
                reply = UnableToBuildLeaderboardReply;
            }
            break;

        case ButtonLabel.first:
            if (contractAddress !== undefined && range !== null) {
                reply = await makeLeaderboardReply(contractAddress, 0, offset, isInOpenSeaMode);
            } else {
                reply = UnableToBuildLeaderboardReply;
            }
            break;

        case ButtonLabel.previous:
            if (contractAddress !== undefined && range !== null) {
                reply = await makeLeaderboardReply(contractAddress, index - offset, offset, isInOpenSeaMode);
            } else {
                reply = UnableToBuildLeaderboardReply;
            }
            break;

        case ButtonLabel.next:
            if (contractAddress !== undefined && range !== null) {
                reply = await makeLeaderboardReply(contractAddress, index + offset, offset, isInOpenSeaMode);
            } else {
                reply = UnableToBuildLeaderboardReply;
            }
            break;

        case ButtonLabel.last:
            if (contractAddress !== undefined && range !== null) {
                reply = await makeLeaderboardReply(contractAddress, Number.MAX_VALUE, offset, isInOpenSeaMode);
            } else {
                reply = UnableToBuildLeaderboardReply;
            }
            break;

        case ButtonLabel.opensea:
            if (contractAddress !== undefined && range !== null) {
                reply = await makeLeaderboardReply(contractAddress, index, offset, true);
            } else {
                reply = UnableToBuildLeaderboardReply;
            }
            break;

        case ButtonLabel.range:
            if (contractAddress !== undefined && range !== null) {
                reply = await makeLeaderboardReply(contractAddress, index, offset, false);
            } else {
                reply = UnableToBuildLeaderboardReply;
            }
            break;
    
        default:
            return;
    }
    return await interaction.update(reply);
}