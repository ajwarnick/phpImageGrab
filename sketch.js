// dynamic parameters
let img;

const cellSize = 20;
const offset = cellSize * 3;
const imgBuffer = 40;
const sW = 1;

const bw = true;

function setup() {
    canvas = createCanvas(window.innerWidth, window.innerHeight);
    let image = document.getElementById("image");
    img = loadImage(image.src);
    // getArticleList()
}

function draw() {
  background(0);
  // image(img, 0, 0);
  drawImage(img);
  // noLoop();
}

function mousePressed() {
  noLoop();
}

drawImage = function (i) {
  if( i.width >= i.height){
    console.log("yo");
  }else{
    console.log("oy");
  }

  let nW = width - (imgBuffer + imgBuffer);
  let nH = ((width - (imgBuffer + imgBuffer)) * i.height) / i.width;

  let x = i.width >= width ? 0 + imgBuffer : 0 + imgBuffer;
  let y = nH >= height ? 0 + imgBuffer : (height - (width * i.height) / i.width) / 2 + imgBuffer;

  image(i, x, y, nW, nH);
  drawGrid(x, y, nW, nH);
  drawDots(x, y, nW, nH);
};

drawGrid = function (x, y, w, h) {
  strokeWeight(sW);
  // stroke(55);
  stroke(255);

  // Vertical Loop
  for (let i = 0; i < (w - offset - offset) / (cellSize + sW) + 2; i++) {
    drawGridLine(
      x + offset + cellSize * i,
      y + offset,
      x + offset + cellSize * i,
      y + (h - offset)
    );
  }

  // line(x + random(10, 20), y + offset, x + w - random(10, 20), y + offset);

  // line(
  //   x + random(10, 20),
  //   y + h - offset,
  //   x + w - random(10, 20),
  //   y + h - offset
  // );

  // Hoizontal Loop
  for (let i = 0; i < (h - offset - offset) / (cellSize + sW) + 1; i++) {
    drawGridLine(
      x + offset,
      y + offset + cellSize * i,
      x + (w - offset),
      y + offset + cellSize * i
    );
  }

  // line(x + offset, y + random(10, 20), x + offset, y + h - random(10, 20));

  // line(
  //   x + w - offset - 5,
  //   y + random(10, 20),
  //   x + w - offset - 5,
  //   y + h - random(10, 20)
  // );
};

drawDots = (x, y, w, h) => {
  for (let i = 0; i < (h - offset - offset) / (cellSize + sW); i++) {
    for (let j = 0; j < (w - offset - offset) / (cellSize + sW) + 1; j++) {
      drawDot(x + offset + cellSize * j, y + offset + cellSize * i);
    }
  }
};

drawDot = (x, y) => {
  const localX = x + cellSize / 2;
  const localY = y + cellSize / 2;

  noStroke();
  fill(getAverage(localX, localY));
  circle(localX, localY, cellSize - random(4, 6));
};

drawGridLine = (x1, y1, x2, y2) => {
  let vertical = x1 === x2 ? 1 : 0;
  let horizontal = y1 === y2 ? 1 : 0;

  line(x1, y1, x2, y2);
  line(x1, y1, x1 - random(30) * horizontal, y1 - random(30) * vertical);
  line(x2, y2, x2 + random(30) * horizontal, y2 + random(30) * vertical);
};

getAverage = (x, y) => {
  // let c = get(x + cellSize / 2, y + cellSize / 2);
  let c = get(x, y);
  let opacity = c.pop();

  if (bw) {
    return getGray(c) >= 127 ? 235 : 50;
  }

  return c;
};

const getGray = (color) => {
  const red = color[0] / 255;
  const green = color[1] / 255;
  const blue = color[2] / 255;

  // the algorithm i used id , G =  B*0.07 + G*0.72 + R* 0.21
  const gray = blue * 0.07 + green * 0.72 + red * 0.21;

  return (gray * 255).toFixed();
};

const arrAvg = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;


window.onresize = function() {
  loop()
  var w = window.innerWidth;
  var h = window.innerHeight;  
  canvas.size(w,h);
  width = w;
  height = h;
};
