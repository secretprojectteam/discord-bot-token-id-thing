import { ethers } from "ethers";
import { Filter } from "@ethersproject/abstract-provider";
import { infuraID, infuraSecret } from "./dotenv";

export const provider = new ethers.providers.InfuraProvider(
    "homestead", {
        projectId: infuraID,
        projectSecret: infuraSecret
    }
);

export enum LogTopic {
    transfer = "Transfer(address,address,uint256)"
}

export function makeTransactionFilter(address: string, fromBlock: number, offset: number): Filter {
    return {
        address: address,
        fromBlock: fromBlock,
        toBlock: fromBlock + offset,
        topics: [
            ethers.utils.id(LogTopic.transfer)
        ]
    };
}