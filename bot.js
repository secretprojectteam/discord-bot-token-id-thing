const fs = require('fs');
const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
require('dotenv').config();

const cFAContractAddress = "0x93a796B1E846567Fe3577af7B7BB89F71680173a"
const cFContractAddress = "0x91047abf3cab8da5a9515c8750ab33b4f1560a7a";

const infuraID = process.env.INFURA_PROJECT_ID;
const infuraSecret = process.env.INFURA_PROJECT_SECRET;

const Web3 = require('web3');
const provider = 'https://mainnet.infura.io/v3/'+infuraID;
const web3Provider = new Web3.providers.HttpProvider(provider);
const web3 = new Web3(web3Provider);
const abi = require("./src/abi");
const axios = require('axios');

const cfaContract = new web3.eth.Contract(abi, cFAContractAddress);
const cfContract = new web3.eth.Contract(abi, cFContractAddress);
const svg2png = require("svg2png");


client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);

    client.on('messageCreate', async message => {
        //bot commands
        let command = message.content.split(' ');

        console.log(command);

        if (command[0][0] === '!') {
            //commandBus.handle(message, command, command.splice(1));
            if (command[0] === '!view' && command[1] === 'cfa') {
                // message.reply('Tokens Created ');
                try {
                    const svg = await cfaContract.methods.renderSvg(parseInt(command[2])).call();
                    const title = `CFA #${command[2]}`;
                    const url = `https://opensea.io/assets/${cFAContractAddress}/${command[2]}`
                    await displaySVG(message, svg, title, url);
                } catch (e) {
                    console.error(e);
                }
            }
            if (command[0] === '!view' && command[1] === 'cf') {
                try {
                    let r = await axios.get('https://chainfacesrinkeby.azurewebsites.net/api/HttpTrigger?id='+command[2]);
                    const svg = r.data.image_data;

                    const title = `CF #${command[2]}`;
                    const url = `https://opensea.io/assets/${cFAContractAddress}/${command[2]}`
                    await displaySVG(message, svg, title, url);
                } catch (e) {
                    console.error(e);
                }
            }
        }
    });
});

client.login(process.env.DISCORD_BOT_KEY);


const { MessageAttachment, MessageEmbed } = require("discord.js");
const nodeHtmlToImage = require("node-html-to-image");

function buildTheHTML(svg) {
    return `
<!DOCTYPE html>
<html lang="en">
    <head>
        <style>
        body { 
            width: 400px; 
        } 
        svg{
            width: 400px; 
            height: 400px;
            font-family: "Times New Roman", sans-serif;
        }
        </style>
    </head>
    <body>
        ${svg}
    </body>
</html>
`
}

/**
 * @param message
 * @param svg
 * @param title
 * @param url
 * @returns {Promise<void>}
 */
async function displaySVG(message, svg, title, url) {
    const html = buildTheHTML(svg);

    console.log(html);

    // const output = await nodeHtmlToImage({
    //     html: html,
    //     quality: 100,
    //     type: "png",
    //     puppeteerArgs: {
    //         args: ["--no-sandbox"],
    //     },
    //     encoding: "binary"
    // });

    let t = tmpName(16);

    let buffer = svg2png.sync(svg, { width: 400, height: 400 });
    fs.writeFileSync("/tmp/"+t+".png", buffer);

    const file = new MessageAttachment(buffer, t+".png");

    const embed = new MessageEmbed()
        .setTitle(title)
        .setURL(url)
        .setImage("attachment://"+t+".png");

    message.channel.send({ embeds: [embed], files: [file] });
}

function tmpName(n) {
    let name = "";
    let chars = [ 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
        'M', 'N', 'O', 'P', 'Q', 'R',  'S', 'T', 'U', 'V', 'W', 'X',
        'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
    'u', 'v', 'w', 'x', 'y', 'z'];

    for(let x = 0; x<n; x++) {
        name += chars[Math.floor(Math.random() * chars.length)];
    }

    return name;
}