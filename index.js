const { Client, Intents, MessageAttachment } = require('discord.js');
const Web3 = require('web3');
require('dotenv').config();
const { DISCORD_BOT_KEY, DISCORD_CLIENT_ID, INFURA_ENDPOINT } = process.env;
const fs = require('fs');
const { svg2png } = require('svg-png-converter');

const contractJSON = fs.readFileSync('./contract/abi.json');
const CONTRACT_ABI = JSON.parse(contractJSON);
const CONTRACT_ADDRESS = '0x93a796B1E846567Fe3577af7B7BB89F71680173a';

const DISCORD_COMMAND_PREFIX = '!view';
const web3 = new Web3(INFURA_ENDPOINT);
const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);

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

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
client.once('ready', () => {
    console.log('Ready!');
});

client.login(DISCORD_BOT_KEY);

client.on('messageCreate', async (message) => {
    if (message.content.startsWith(DISCORD_COMMAND_PREFIX)) {
        const [_command, tokenId] = message.content.split(' ');
        const parsedTokenId = parseInt(tokenId, 10);

        if (!isNaN(parsedTokenId)) {
            try {
                const svg = await contract.methods
                    .renderSvg(parsedTokenId)
                    .call();

                const isValidSvg = svg.startsWith('<svg');
                if (!isValidSvg) {
                    message.reply(
                        `Beep boop: I couldn't find a token with ID ${parsedTokenId}.`
                    );
                    return;
                }

                const outputBuffer = await svg2png({
                    input: svg,
                    encoding: 'buffer',
                    format: 'png',
                    quality: 1,
                });

                message.channel.send({
                    content: `Chainfaces #${parsedTokenId}\nOpensea: https://opensea.io/assets/0x93a796b1e846567fe3577af7b7bb89f71680173a/${parsedTokenId}`,
                    files: [
                        new MessageAttachment(
                            outputBuffer,
                            `${parsedTokenId}.png`
                        ),
                    ],
                });
            } catch {}
        } else {
            message.reply(
                `Invalid token ID used. Please use a number.\nExample: \`${DISCORD_COMMAND_PREFIX} 123\``
            );
        }
    }
});
