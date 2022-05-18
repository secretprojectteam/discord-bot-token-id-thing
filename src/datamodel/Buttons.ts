import { Constants, MessageButton } from "discord.js";

export enum ButtonLabel {
    ten = "10",
    twenty = "20",
    opensea = "OpenSea", 
    fifty = "50",
    hundred = "100",
    first = "First",
    previous = "Previous",
    range = "range",
    next = "Next",
    last = "Last",
}

export function tenButton(disabled = false): MessageButton {
    return new MessageButton()
        .setCustomId(ButtonLabel.ten)
        .setLabel(ButtonLabel.ten)
        .setStyle(Constants.MessageButtonStyles.PRIMARY)
        .setDisabled(disabled);
}

export function twentyButton(disabled = false): MessageButton {
    return new MessageButton()
        .setCustomId(ButtonLabel.twenty)
        .setLabel(ButtonLabel.twenty)
        .setStyle(Constants.MessageButtonStyles.PRIMARY)
        .setDisabled(disabled);
}

export function openseaButton(disabled = false): MessageButton {
    return new MessageButton()
        .setCustomId(ButtonLabel.opensea)
        .setLabel(ButtonLabel.opensea)
        .setStyle(Constants.MessageButtonStyles.PRIMARY)
        .setDisabled(disabled);
}

export function fiftyButton(disabled = false): MessageButton {
    return new MessageButton()
        .setCustomId(ButtonLabel.fifty)
        .setLabel(ButtonLabel.fifty)
        .setStyle(Constants.MessageButtonStyles.PRIMARY)
        .setDisabled(disabled);
}

export function hundredButton(disabled = false): MessageButton {
    return new MessageButton()
        .setCustomId(ButtonLabel.hundred)
        .setLabel(ButtonLabel.hundred)
        .setStyle(Constants.MessageButtonStyles.PRIMARY)
        .setDisabled(disabled);
}

export function firstButton(id: ButtonLabel = ButtonLabel.first): MessageButton {
    return new MessageButton()
        .setCustomId(id)
        .setLabel(ButtonLabel.first)
        .setStyle(Constants.MessageButtonStyles.PRIMARY);
}

export function previousButton(id: ButtonLabel = ButtonLabel.previous): MessageButton {
    return new MessageButton()
        .setCustomId(id)
        .setStyle(Constants.MessageButtonStyles.PRIMARY)
        .setEmoji("◀️");
}

export function leaderboardRangeButton(range: string, disabled = false): MessageButton {
    return new MessageButton()
        .setCustomId(ButtonLabel.range)
        .setLabel(range)
        .setStyle(Constants.MessageButtonStyles.PRIMARY)
        .setDisabled(disabled);
}

export function nextButton(id: ButtonLabel = ButtonLabel.next): MessageButton {
    return new MessageButton()
        .setCustomId(id)
        .setStyle(Constants.MessageButtonStyles.PRIMARY)
        .setEmoji("▶️");
}

export function lastButton(id: ButtonLabel = ButtonLabel.last): MessageButton {
    return new MessageButton()
        .setCustomId(id)
        .setLabel(ButtonLabel.last)
        .setStyle(Constants.MessageButtonStyles.PRIMARY);
}