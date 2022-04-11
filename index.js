require('dotenv').config();
const { DISCORD_BOT_KEY, DISCORD_CLIENT_ID } = process.env;

/**
 * The Discord bot needs the following Bot Permissions:
 * 1. Read Messages/View Channels
 * 2. Send Messages
 * 3. Send MEssages in Threads
 * 4. Embed Links
 * 5. Attach Files
 */
const DISCORD_BOT_PERMISSIONS = 274877959168;

const DISCORD_INVITE_LINK = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&permissions=${DISCORD_BOT_PERMISSIONS}&scope=bot
`;

console.log(`To add this bot to a server, go here: ${DISCORD_INVITE_LINK}`);
