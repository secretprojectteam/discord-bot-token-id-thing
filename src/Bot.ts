import { Events } from "./Events";
import { client } from "./utilities/client";
import { botTokenID } from "./utilities/dotenv";

console.log("Bot is starting...");

for (const event of Events) {
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.login(botTokenID);