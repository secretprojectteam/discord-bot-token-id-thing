const { createCanvas, Image } = require("canvas");
const fs = require("fs");

const width = 400;
const height = 400;

const canvas = createCanvas(width, height);

const context = canvas.getContext("2d");

let svg = `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400' style='background-color:RGB(255,255,235)'><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='75px' fill='RGB(0,0,0)'>〘★◡◠ᚹ</text></svg>`;

let i = new Image();
i.src = svg;
i.onload = () => {
    context.drawImage(i, 0,0 );
    const buffer = canvas.toBuffer("image/png");

    const fs = require("fs");
    fs.writeFileSync("./image.png", buffer);
}


