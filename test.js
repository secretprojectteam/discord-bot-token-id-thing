const { createCanvas, Image } = require("canvas");
const fs = require("fs");

const width = 400;
const height = 400;



function doAThing(svg) {
    const canvas = createCanvas(width, height);

    const context = canvas.getContext("2d");

    let i = new Image();
    i.src = svg;
    i.onload = () => {
        context.drawImage(i, 0,0 );
        const buffer = canvas.toBuffer("image/png");

        const fs = require("fs");
        fs.writeFileSync("./image.png", buffer);
    }
}
