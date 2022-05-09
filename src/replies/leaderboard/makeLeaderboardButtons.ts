import { MessageActionRow } from "discord.js";
import { 
    fiftyButton, 
    firstButton, 
    hundredButton, 
    lastButton, 
    leaderboardRangeButton, 
    nextButton, 
    openseaButton, 
    previousButton, 
    tenButton, 
    twentyButton 
} from "../../datamodel/Buttons";

export function makeLeaderboardButtons(range: string, isOpenSeaReply = false): MessageActionRow[] {
    return [
        new MessageActionRow()
            .addComponents(
                tenButton(isOpenSeaReply),
                twentyButton(isOpenSeaReply),
                openseaButton(isOpenSeaReply),
                fiftyButton(isOpenSeaReply),
                hundredButton(isOpenSeaReply),
            ),
        new MessageActionRow()
            .addComponents(
                firstButton(),
                previousButton(),
                leaderboardRangeButton(range, !isOpenSeaReply),
                nextButton(),
                lastButton()
            )
    ];
}