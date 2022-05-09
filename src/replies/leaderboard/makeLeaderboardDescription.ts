import { LeaderboardEntry } from "../../datamodel/LeaderboardEntry";

function makeLeaderboardListHeader(isLong: boolean): string {
    const longAddressSpacing = "                                  ";
    return `
\`\`\`md
Rank:     Address:     ${isLong ? longAddressSpacing : ""}Quantity:     Percentage:
`;
}

function makeRank(index: number): string {
    let rank = `${index + 1}`;
    if (index < 9) rank += "    ";
    else if (index < 99) rank += "   ";
    else if (index < 999) rank += "  ";
    else if (index < 9999) rank += " ";
    return rank;
}

function makeAddress(entry: LeaderboardEntry, isLong: boolean): string {
    if (entry.ens !== null) {
        if (isLong) {
            let address = entry.ens;
            while (address.length < 42) address += " ";
            return address;
        } else {
            if (entry.ens.length <= 8) {
                let address = entry.ens;
                while (address.length < 8) address += " ";
                return address;
            } else {
                return `${entry.ens.substring(0, 5)}...`;
            }
        }
    } else {
        if (isLong) {
            let address = entry.address;
            while (address.length < 42) address += " ";
            return address;
        }
        return `${entry.address.substring(0, 3)}...${entry.address.substring(entry.address.length - 2)}`;
    }
}

function makeOpenSeaAddress(entry: LeaderboardEntry): string {
    return `[${makeAddress(entry, true)}](https://opensea.io/${entry.ens !== null ? entry.ens : entry.address})`;
}

function makeQuantity(quantity: number): string {
    let sQuantity = `${quantity}    `;
    if (quantity < 9) sQuantity += "    ";
    else if (quantity < 99) sQuantity += "   ";
    else if (quantity < 999) sQuantity += "  ";
    else if (quantity < 9999) sQuantity += " ";
    return sQuantity;
}

function makePercentage(quantity: number, totalSupply: number): string {
    const percentage = quantity / totalSupply * 100;
    let sPercentage = `${percentage.toFixed(2)}%    `;
    if (percentage < 10) sPercentage += "  ";
    else if (percentage < 100) sPercentage += " ";
    return sPercentage;
}

function makeLeaderboardListEntry(entry: LeaderboardEntry, index: number, isLong: boolean, totalSupply: number): string {
    const rank = makeRank(index);
    const address = makeAddress(entry, isLong);
    const quantity = makeQuantity(entry.tokens.length);
    const percentage = makePercentage(entry.tokens.length, totalSupply);
    return `${rank}     ${address}     ${quantity}     ${percentage}\n`;
}

function makeOpenSeaLeaderboardListEntry(entry: LeaderboardEntry, index: number): string {
    const rank = makeRank(index);
    const address = makeOpenSeaAddress(entry);
    return `#${rank}: ${address}\n`;
}

export function makeOpenSeaLeaderboardDescription(
    leaderboard: LeaderboardEntry[],
    index: number,
    offset: number
): string {
    let description = "";
    for (let i = index; i < index + offset; i++) {
        const entry = leaderboard[i];
        description += makeOpenSeaLeaderboardListEntry(entry, i);
    }
    return description;
}

export function makeLeaderboardDescription(
    leaderboard: LeaderboardEntry[], 
    index: number, 
    offset: number, 
    totalSupply: number
): string {
    const useLongAddresses = offset < 20;
    let description = makeLeaderboardListHeader(useLongAddresses);
    for (let i = index; i < index + offset; i++) {
        const entry = leaderboard[i];
        description += makeLeaderboardListEntry(entry, i, useLongAddresses, totalSupply);
    }
    description += "```";
    return description;
}