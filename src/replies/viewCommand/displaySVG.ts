import { CommandInteraction, MessageAttachment, MessageEmbed } from "discord.js";
import nodeHtmlToImage = require("node-html-to-image");

function buildTheHTML(svg: string) {
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
            heigth: 400px;
        }
    </style>
    </head>
    <bod>
        ${svg}
    </bod>
</html>
`
}

export async function displaySVG(interaction: CommandInteraction, svg: string, title: string, url: string) {
    const html = buildTheHTML(svg);

    const output = await nodeHtmlToImage({
        html: html,
        quality: 100,
        type: "png",
        puppeteerArgs: {
          args: ["--no-sandbox"],
        },
        encoding: "binary"
      }) as Buffer;

    const file = new MessageAttachment(output, "Image.png");

    const embed = new MessageEmbed()
        .setTitle(title)
        .setURL(url)
        .setImage("attachment://Image.png");

    interaction.editReply({ embeds: [embed], files: [file] });
}