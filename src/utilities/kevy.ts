import Keyv from "keyv";

export enum DatabaseKeys {
    blockNumber = "blockNumber",
    leaderboardIsNotReady = "leaderboardIsNotReady",
    leaderboard = "leaderboard",
}

export function database(): Keyv {
    return new Keyv('sqlite://database/database.sqlite');
}