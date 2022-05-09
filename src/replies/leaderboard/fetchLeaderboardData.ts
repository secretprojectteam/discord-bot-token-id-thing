import { database, DatabaseKeys } from "../../utilities/kevy";
import { LogTopic, makeTransactionFilter, provider } from "../../utilities/ethers";
import { Log } from "@ethersproject/abstract-provider";
import { BigNumber, ethers } from "ethers";
import { LeaderboardEntry } from "../../datamodel/LeaderboardEntry";

async function processTransferLog(leaderboard: LeaderboardEntry[], entry: Log) {
    let from = BigNumber.from(entry.topics[1]).toHexString();
    let to = BigNumber.from(entry.topics[2]).toHexString();
    const tokenId = BigNumber.from(entry.topics[3]).toNumber();
    const leaderboardIsReady: boolean = !(await database().get(DatabaseKeys.leaderboardIsNotReady) as boolean);

    while (from.length < 42) {
        from = from.slice(0, 2) + "0" + from.slice(2);
    }
    while (to.length < 42) {
        to = to.slice(0, 2) + "0" + to.slice(2);
    }
    
    const sender = leaderboard.find(
        (entry) => entry.address === from
    );
    if (sender !== undefined) {
        const index = sender.tokens.indexOf(tokenId);
        if (index > -1) {
            sender.tokens.splice(index, 1);
        }
    }
    const receiver = leaderboard.find(
        (entry) => entry.address === to
    );
    if (receiver === undefined) {
        let ens: string | null = null;
        if (leaderboardIsReady) ens = await provider.lookupAddress(to);
        leaderboard.push({ address: to, tokens: [tokenId], ens: ens });
    } else {
        const index = receiver.tokens.indexOf(tokenId);
        if (index === -1) receiver.tokens.push(tokenId);
    }
}

function processTransferLogs(leaderboard: LeaderboardEntry[], logs: Log[]) {
    logs.forEach(entry => {
        processTransferLog(leaderboard, entry);
    });

    return leaderboard;
}

function sortAndFilter(leaderboard: LeaderboardEntry[]): LeaderboardEntry[] {
    const filteredLeaderboard = leaderboard.filter(entry => entry.tokens.length > 0);
    return filteredLeaderboard.sort(
        (left, right) => (left.tokens.length < right.tokens.length) ? 1 : (left.tokens.length > right.tokens.length) ? -1 : 0
    );
}

async function onTransfer(log: Log) {
    const leaderboard = await database().get(DatabaseKeys.leaderboard) as LeaderboardEntry[];
    await processTransferLog(leaderboard, log);
    await database().set(DatabaseKeys.leaderboard, sortAndFilter(leaderboard));
    const currentBlockNumber = provider.getBlockNumber();
    await database().set(DatabaseKeys.blockNumber, currentBlockNumber);
}

async function lookupENSNames() {
    const leaderboard = await database().get(DatabaseKeys.leaderboard) as LeaderboardEntry[];

    for await (const entry of leaderboard) {
        entry.ens = await provider.lookupAddress(entry.address);
        await database().set(DatabaseKeys.leaderboard, leaderboard);
    }

    await database().set(DatabaseKeys.leaderboard, sortAndFilter(leaderboard));
}

export async function fetchLeaderboardData(contractAddress: string) {
    await database().set(DatabaseKeys.leaderboardIsNotReady, true);
    let currentBlock = await database().get(DatabaseKeys.blockNumber) as number;
    if (currentBlock === undefined) currentBlock = 13916172;
    const mostRecentBlock = await provider.getBlockNumber();
    let leaderboard = await database().get(DatabaseKeys.leaderboard) as LeaderboardEntry[];
    if (leaderboard === undefined) leaderboard = [];

    do {
        console.log(currentBlock);
        try {
            const offset = 1000;
            const tokenTransfers: Log[] = await provider.getLogs(makeTransactionFilter(contractAddress, currentBlock, offset));
            currentBlock += offset;
            leaderboard = await processTransferLogs(leaderboard, tokenTransfers);
        } catch {
            const offset = 100;
            const tokenTransfers: Log[] = await provider.getLogs(makeTransactionFilter(contractAddress, currentBlock, offset));
            currentBlock += offset;
            leaderboard = await processTransferLogs(leaderboard, tokenTransfers);
        }
    } while (currentBlock < mostRecentBlock);

    await database().set(DatabaseKeys.leaderboard, sortAndFilter(leaderboard));
    await database().set(DatabaseKeys.blockNumber, mostRecentBlock);
    await database().set(DatabaseKeys.leaderboardIsNotReady, false);

    provider.on(
        {
            address: contractAddress,
            topics: [
                ethers.utils.id(LogTopic.transfer)
            ]
        },
        onTransfer
    );

    lookupENSNames();
}