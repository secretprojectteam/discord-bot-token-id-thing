import Keyv from "keyv";
import KeyvSqlite from "@keyv/sqlite";

export enum DatabaseKeys {
    blockNumber = "blockNumber",
    leaderboardIsNotReady = "leaderboardIsNotReady",
    leaderboard = "leaderboard",
}

export function database(): Keyv {
    return new Keyv({ store: new KeyvSqlite('sqlite://database/database.sqlite')})
}