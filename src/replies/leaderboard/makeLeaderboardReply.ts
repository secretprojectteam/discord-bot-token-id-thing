import { InteractionReplyOptions, MessageEmbed } from "discord.js";
import { LeaderboardEntry } from "../../datamodel/LeaderboardEntry";
import { maximumCFAIndex } from "../../utilities/dotenv";
import { database, DatabaseKeys } from "../../utilities/kevy";
import { 
    EmptyLeaderboardReply,
    LeaderboardNotReadyReply
} from "./leaderboardReplies";
import { makeLeaderboardButtons } from "./makeLeaderboardButtons";
import { makeLeaderboardDescription, makeOpenSeaLeaderboardDescription } from "./makeLeaderboardDescription";

function makeNormalLeaderboardReply(
    leaderboard: LeaderboardEntry[], 
    index: number, 
    offset: number,
    totalSupply: number
): InteractionReplyOptions {
    let reply: InteractionReplyOptions;
    let clippedIndex = index < 0 ? 0 : index;
    if (offset > 50) {
        clippedIndex = clippedIndex + 100 > leaderboard.length ? leaderboard.length - 100 : clippedIndex;
        reply = {
            content: null,
            embeds: [
                new MessageEmbed()
                .setDescription(makeLeaderboardDescription(leaderboard, clippedIndex, 50, totalSupply)),
                new MessageEmbed()
                .setDescription(makeLeaderboardDescription(leaderboard, clippedIndex + 50, 50, totalSupply))
            ]
        };
    } else if (offset > 20) {
        clippedIndex = clippedIndex + 50 > leaderboard.length ? leaderboard.length - 50 : clippedIndex;
        reply = {
            content: null,
            embeds: [
                new MessageEmbed()
                .setDescription(makeLeaderboardDescription(leaderboard, clippedIndex, 50, totalSupply))
            ]
        };
    } else if (offset > 10) {
        clippedIndex = clippedIndex + 20 > leaderboard.length ? leaderboard.length - 20 : clippedIndex;
        reply = {
            content: makeLeaderboardDescription(leaderboard, clippedIndex, 20, totalSupply),
            embeds: []
        };
    } else {
        clippedIndex = clippedIndex + 10 > leaderboard.length ? leaderboard.length - 10 : clippedIndex;
        reply = {
            content: makeLeaderboardDescription(leaderboard, clippedIndex, 10, totalSupply),
            embeds: []
        };
    }
    reply.components = makeLeaderboardButtons(`${clippedIndex + 1} - ${clippedIndex + offset}`);
    return reply;
}

function makeOpenSeaLeaderboardReply(
    leaderboard: LeaderboardEntry[],
    index: number
): InteractionReplyOptions {
    let clippedIndex = index < 0 ? 0 : index;
    clippedIndex = clippedIndex + 10 > leaderboard.length ? leaderboard.length - 10 : clippedIndex;
    return {
        content: null,
        embeds: [
            new MessageEmbed()
            .setDescription(makeOpenSeaLeaderboardDescription(leaderboard, clippedIndex, 10))
        ],
        components: makeLeaderboardButtons(`${clippedIndex + 1} - ${clippedIndex + 10}`, true)
    };
}

export async function makeLeaderboardReply(
    contractAddress: string, 
    index: number, 
    offset: number, 
    isOpenSeaReply = false
): Promise<InteractionReplyOptions> {
    if ((await database().get(DatabaseKeys.leaderboardIsNotReady) as boolean) === true) {
        return LeaderboardNotReadyReply;
    }
    const leaderboard = await database().get(DatabaseKeys.leaderboard) as LeaderboardEntry[];
    if (leaderboard === undefined || leaderboard.length === 0) {
        return EmptyLeaderboardReply;
    }

    const totalSupply = maximumCFAIndex + 1;
    if (isOpenSeaReply) {
        return makeOpenSeaLeaderboardReply(leaderboard, index);
    } else {
        return makeNormalLeaderboardReply(leaderboard, index, offset, totalSupply);
    }
}