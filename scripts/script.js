// TEXTURES

// Plain
let grassTextureSide;
let grassTextureTop;
let stoneTexture;
let dirtTexture;
let oakTexture;
let leavesTexture;
let waterTexture;
let torchTexture;
let flower1;
let poppyTexture;
let grassBladeTexture;
let foxTailTexture;
// Desert
let sandTexture;
let sandStoneTexture;
let cactusTexture;
let bushTexture;
let lavaTexture;
// Winter
let snowTexture;
let dirtSnowTexture;
let leavesWTexture;
let iceTexture;

let snow = [];
let gravity;
let zOff = 0;
let spritesheet;
let textures = [];

let rotation = 0;

// Blocs Colors
let dirtColor = "#9B642E";
let stoneColor = "#696C71";

// Default Biome
let biome = "plain";

// Music
let musicPlain = new Audio("../assets/music/plain.mp3");
let musicDesert = new Audio("../assets/music/desert.mp3");
let musicWinter = new Audio("../assets/music/winter.mp3");
let clic = new Audio("../assets/music/clic.mp3");

// Descriptions

const plainDesc =
  "Plains are the most common landscape in the game. It was the first biome in Minecraft, ine arly versions it was even the only biome in the game. Many species of animals and plants live there. It is possible to see holes in the middle of the plains, these are the entrances to caves that can sometimes be huge.";

const desertDesc =
  "This desert biome is covered with sand on its surface and rocky sand deeper down. It is dry and hot, no rain falls and no animals live there. You will only come across a few monsters at night. The desert is nevertheless alive: You will find many constructions there: Pyramids, wells and NPC villages. In the underground you can find the same structures as in the other biomes.";

const winterDesc =
  "The icy plains are vast, flat and almost deserted frozen areas. Only a few rare polar bears live there, there are also a few scattered fir trees. The water freezes naturally, so all the water bodies are naturally formed of ice and if you put water there it will turn into ice. Igloos are regularly found on these plains.";

let title = document.getElementById("title");
let contentDesc = document.getElementById("content");
let init = document.getElementById("init");
let musicState = document.getElementById("musicState");
let description = document.getElementById("description");

let music = true;
let currentMusic = musicPlain;
let startGame = true;

let biomeDuration = 30;

function preload() {
  // PLAIN
  grassTextureSide = loadImage("../assets/grassTextureSide.png");
  grassTextureTop = loadImage("../assets/grassTextureTop.png");
  stoneTexture = loadImage("../assets/stoneTexture.png");
  dirtTexture = loadImage("../assets/dirtTexture.png");
  oakTexture = loadImage("../assets/oakTexture.png");
  leavesTexture = loadImage("../assets/leavesTexture.png");
  waterTexture = loadImage("../assets/waterTexture.gif");
  torchTexture = loadImage("../assets/torchTexture.png");
  flower1 = loadImage("../assets/flower1Texture.png");
  poppyTexture = loadImage("../assets/poppyTexture.png");
  grassBladeTexture = loadImage("../assets/grassBladeTexture.png");
  foxTailTexture = loadImage("../assets/foxTailTexture.png");

  // DESERT
  cactusTexture = loadImage("../assets/cactusTexture.png");
  sandTexture = loadImage("../assets/sandTexture.png");
  sandStoneTexture = loadImage("../assets/sandStoneTexture.png");
  bushTexture = loadImage("../assets/bushTexture.png");
  lavaTexture = loadImage("../assets/lavaTexture.gif");

  // WINTER
  snowTexture = loadImage("../assets/snowTexture.png");
  dirtSnowTexture = loadImage("../assets/dirtSnowTexture.png");
  leavesWTexture = loadImage("../assets/leavesWTexture.png");
  iceTexture = loadImage("../assets/iceTexture.png");
  // spritesheet = loadImage("../assets/flakes32.png");
}

// let camera;

function setup() {
  createCanvas(windowWidth / 2, windowHeight, WEBGL);
  angleMode(DEGREES);
  noStroke();

  particleSystem = createParticleSystem(0.05, 0.1, function () {
    let particle = createParticle(2);

    let dir = randomDir(0.2, 0, -1, 0);

    let moveSpeed = 0.05;
    let x = 0;
    let y = -295;
    let z = -222;

    particle.draw = function () {
      x += dir.x * deltaTime * moveSpeed;
      y += dir.y * deltaTime * moveSpeed;
      z += dir.z * deltaTime * moveSpeed;

      push();
      fill("#ffffff72");
      translate(x, y, z);
      box(12);
      pop();
    };

    return particle;
  });
}

let flakeInterval;

console.log(grassTextureSide);
let flakes;
console.log(flakes);

// let plain;
// let desert;
// let winter;

function changebiome(e) {
  console.log("interval");
  if (biome == "plain") {
    biome = "desert";
    updateBiome();
  } else if (biome == "desert") {
    biome = "winter";
    updateBiome();
  } else if (biome == "winter") {
    biome = "plain";
    updateBiome();
  }
}

function updateBiome() {
  console.log("le biome est" + biome);
  if (biome == "plain") {
    document.body.style.background = "#8dd0f7";
    title.innerHTML = "Sakura Plain";
    description.innerHTML = plainDesc;
    flakes = document.querySelectorAll(".fa-snowflake");
    flakes.forEach((flake) => {
      flake.style.display = "none";
    });
    clearInterval(flakeInterval);

    if (music == true) {
      musicPlain.play();
      musicDesert.pause();
      musicWinter.pause();
      currentMusic = musicPlain;
    }
  } else if (biome == "desert") {
    document.body.style.background = "#dedaba";
    title.innerHTML = "Endless DESERT";
    description.innerHTML = desertDesc;
    flakes = document.querySelectorAll(".fa-snowflake");
    flakes.forEach((flake) => {
      flake.style.display = "none";
    });
    clearInterval(flakeInterval);

    if (music == true) {
      musicDesert.play();
      musicPlain.pause();
      musicWinter.pause();
      currentMusic = musicDesert;
    }
  } else if (biome == "winter") {
    flakeInterval = setInterval(createSnowFlake, 50);
    document.body.style.background = "#62a5bf";
    title.innerHTML = "Snowy Toundra";
    description.innerHTML = winterDesc;
    if (music == true) {
      musicWinter.play();
      musicPlain.pause();
      musicDesert.pause();
      currentMusic = musicWinter;
    }
  }
}

function draw() {
  camera(cos(frameCount / 2) * 1000, -300, sin(frameCount / 2) * 1000, 0, -300, 0);

  if (biome == "plain") {
    biomePlain();
  } else if (biome == "desert") {
    biomeDesert();
  } else if (biome == "winter") {
    biomeWinter();
  }
}

function biomePlain() {
  // rotateX(-1);
  translate(0, -200, 300);
  // push();
  background("#8dd0f7");

  push();
  // orbitControl();
  rotateY(0);

  directionalLight(255, 225, 120, 800, 400, -500);

  directionalLight(255, 225, 120, 800, 400, -500);
  directionalLight(255, 225, 120, -800, 400, 500);
  directionalLight(150, 150, 150, 800, 400, -500);
  directionalLight(150, 150, 150, -800, 400, -500);

  // rotateY(180);

  // FOX

  push();
  fill("#E27C21");
  translate(0, -70, -200);
  rotateY(-20);
  scale(0.5, 0.5, 0.5);
  push();
  box(200, 100, 100);
  pop();
  push();
  translate(0, 10, 100);
  texture(foxTailTexture);
  rotateZ(-90);
  box(80, 180, 80);
  pop();
  push();
  texture(foxTailTexture);
  rotateX(90);
  rotateZ(-90);
  translate(-100, 0, 30.1);
  plane(80, 180);
  pop();
  push();
  rotateY(-90);
  fill("#FFFFFF");
  translate(100, 5, 90.1);
  plane(80, 70);
  pop();
  push();
  rotateY(0);
  fill("#FFFFFF");
  translate(-150, 20, 90.1);
  plane(60, 50);
  pop();
  push();
  rotateY(0);
  fill("black");
  translate(-150, 5, 90.2);
  plane(30, 15);
  pop();
  push();
  rotateY(-90);
  fill("#E27C21");
  translate(100, 5, -90.1);
  plane(80, 70);
  pop();
  push();
  translate(-150, -5, 10);
  box(150, 110, 100);
  pop();
  push();
  translate(-150, 20, 70);
  box(60, 50, 40);
  pop();
  push();
  translate(-105, -75, 0);
  box(30, 30, 10);
  pop();
  push();
  translate(-200, -75, 0);
  box(30, 30, 10);
  pop();
  push();
  fill("white");
  translate(-200, -75, 5.5);
  plane(30, 30);
  pop();
  push();
  fill("white");
  translate(-105, -75, 5.5);
  plane(30, 30);
  pop();
  push();
  fill("black");
  translate(-207, -25, 60.5);
  plane(35, 15);
  pop();
  push();
  fill("black");
  translate(-100, -25, 60.5);
  plane(35, 15);
  pop();
  push();
  fill("#00000021");
  translate(-100, -40, 60.5);
  plane(35, 15);
  pop();
  push();
  fill("#00000021");
  translate(-207, -40, 60.5);
  plane(35, 15);
  pop();
  pop();

  // DIRT
  let dirt1 = -100;

  for (let i = 0; i < 3; i++) {
    push();
    texture(grassTextureSide);
    translate(dirt1, 0, 0);
    box(100);
    pop();
    dirt1 = dirt1 + 100;
  }

  let dirt2 = -300;

  for (let i = 0; i < 4; i++) {
    push();
    texture(grassTextureSide);
    translate(200, 0, dirt2);
    box(100);
    pop();
    dirt2 = dirt2 + 100;
  }
  let dirt2T = -500;
  for (let i = 0; i < 4; i++) {
    push();
    texture(dirtTexture);
    translate(200, 0, dirt2T);
    box(100);
    pop();
    dirt2T = dirt2T + 100;
  }

  let dirt3 = -200;

  for (let i = 0; i < 4; i++) {
    push();
    texture(grassTextureSide);
    translate(dirt3, 0, -500);
    box(100);
    pop();
    dirt3 = dirt3 + 100;
  }

  let dirt3Y = -100;

  for (let i = 0; i < 4; i++) {
    push();
    texture(grassTextureSide);
    translate(dirt3Y, -100, -500);
    box(100);
    pop();
    dirt3Y = dirt3Y + 100;
  }

  let dirt3Y2 = -200;

  for (let i = 0; i < 4; i++) {
    push();
    texture(grassTextureSide);
    translate(dirt3Y2, -100, -400);
    box(100);
    pop();
    dirt3Y2 = dirt3Y2 + 100;
  }

  let dirt3Z = -500;

  for (let i = 0; i < 4; i++) {
    push();
    texture(grassTextureSide);
    translate(200, -100, dirt3Z);
    box(100);
    pop();
    dirt3Z = dirt3Z + 100;
  }

  push();
  texture(grassTextureSide);
  translate(100, -100, -300);
  box(100);
  pop();

  let dirt4 = -500;

  for (let i = 0; i < 4; i++) {
    push();
    texture(grassTextureSide);
    translate(-300, 0, dirt4);
    box(100);
    pop();
    dirt4 = dirt4 + 100;
  }

  let dirt5 = -500;

  for (let i = 0; i < 4; i++) {
    push();
    texture(dirtTexture);
    translate(-200, 0, dirt5);
    box(100);
    pop();
    dirt5 = dirt5 + 100;
  }

  let dirt6 = -500;

  for (let i = 0; i < 5; i++) {
    push();
    texture(dirtTexture);
    translate(-100, 0, dirt6);
    box(100);
    pop();
    dirt6 = dirt6 + 100;
  }

  let dirt7 = -500;

  for (let i = 0; i < 5; i++) {
    push();
    texture(dirtTexture);
    translate(00, 0, dirt7);
    box(100);
    pop();
    dirt7 = dirt7 + 100;
  }

  let dirt8 = -500;

  for (let i = 0; i < 5; i++) {
    push();
    texture(dirtTexture);
    translate(100, 0, dirt8);
    box(100);
    pop();
    dirt8 = dirt8 + 100;
  }

  push();
  texture(grassTextureSide);
  translate(-200, 0, -100);
  box(100);
  pop();

  // DROPS

  push();
  texture(stoneTexture);
  translate(-200, 100, -100);
  box(100);
  pop();

  push();
  texture(dirtTexture);
  // ambientMaterial(100, 100, 100);
  translate(-300, 100, -200);
  box(100);
  pop();

  push();
  texture(dirtTexture);
  translate(-300, 100, -300);
  box(100);
  pop();

  push();
  texture(stoneTexture);
  translate(-300, 200, -200);
  box(100);
  pop();

  push();
  texture(stoneTexture);
  translate(-200, 200, -100);
  box(100);
  pop();

  push();
  texture(stoneTexture);
  translate(-200, 300, -100);
  box(100);
  pop();

  push();
  texture(stoneTexture);
  translate(-100, 200, 0);
  box(100);
  pop();

  push();
  texture(dirtTexture);
  translate(-100, 100, 0);
  box(100);
  pop();

  push();
  texture(stoneTexture);
  translate(-100, 300, 0);
  box(100);
  pop();

  push();
  texture(stoneTexture);
  translate(-100, 400, 0);
  box(100);
  pop();

  push();
  texture(stoneTexture);
  translate(-200, -100, -500);
  box(100);
  pop();

  push();
  texture(stoneTexture);
  translate(-300, 0, -500);
  box(100);
  pop();

  push();
  texture(stoneTexture);
  translate(0, 300, 0);
  box(100);
  pop();

  push();
  texture(stoneTexture);
  translate(200, 300, 0);
  box(100);
  pop();

  let stonedrop1 = 0;

  for (let i = 0; i < 3; i++) {
    push();
    texture(stoneTexture);
    translate(stonedrop1, 200, 0);
    box(100);
    pop();
    stonedrop1 = stonedrop1 + 100;
  }

  // STONE

  let stone1 = 0;

  for (let i = 0; i < 2; i++) {
    push();
    texture(dirtTexture);
    translate(stone1, 100, 0);
    box(100);
    pop();
    stone1 = stone1 + 100;
  }

  let stone2 = -500;

  for (let i = 0; i < 6; i++) {
    push();
    texture(stoneTexture);
    translate(200, 100, stone2);
    box(100);
    pop();
    stone2 = stone2 + 100;
  }

  let stone3 = -200;

  for (let i = 0; i < 4; i++) {
    push();
    texture(stoneTexture);
    translate(stone3, 100, -500);
    box(100);
    pop();
    stone3 = stone3 + 100;
  }

  let stone4 = -500;

  for (let i = 0; i < 2; i++) {
    push();
    texture(stoneTexture);
    translate(-300, 100, stone4);
    box(100);
    pop();
    stone4 = stone4 + 100;
  }

  // TREE
  // log
  let log = -100;

  for (let i = 0; i < 4; i++) {
    push();
    texture(oakTexture);
    translate(0, log, -300);
    box(100);
    pop();
    log = log - 100;
  }

  // leaves

  let leaves = 100;

  for (let i = 0; i < 3; i++) {
    push();
    texture(leavesTexture);
    translate(leaves, -400, -300);
    box(100);
    pop();
    leaves = leaves - 100;
  }

  let leaves1 = 100;

  for (let i = 0; i < 3; i++) {
    push();
    texture(leavesTexture);
    translate(leaves1, -400, -400);
    box(100);
    pop();
    leaves1 = leaves1 - 100;
  }

  let leaves2 = 100;

  for (let i = 0; i < 3; i++) {
    push();
    texture(leavesTexture);
    translate(leaves2, -400, -200);
    box(100);
    pop();
    leaves2 = leaves2 - 100;
  }

  let leaves3 = 100;

  for (let i = 0; i < 2; i++) {
    push();
    texture(leavesTexture);
    translate(leaves3, -500, -300);
    box(100);
    pop();
    leaves3 = leaves3 - 200;
  }
  let leaves4 = -200;

  for (let i = 0; i < 2; i++) {
    push();
    texture(leavesTexture);
    translate(0, -500, leaves4);
    box(100);
    pop();
    leaves4 = leaves4 - 200;
  }

  push();
  texture(leavesTexture);
  translate(0, -600, -300);
  box(100);
  pop();

  let grass1 = -200;
  for (let i = 0; i < 5; i++) {
    push();
    texture(grassTextureTop);
    rotateX(90);
    translate(grass1, -100, 50.01);
    plane(100, 100);
    pop();
    grass1 = grass1 + 100;
  }

  let grass2 = -300;
  for (let i = 0; i < 5; i++) {
    push();
    texture(grassTextureTop);
    rotateX(90);
    translate(grass2, -200, 50.01);
    plane(100, 100);
    pop();
    grass2 = grass2 + 100;
  }

  let grass3 = -100;
  for (let i = 0; i < 4; i++) {
    push();
    texture(grassTextureTop);
    rotateX(90);
    translate(grass3, 0, 50.01);
    plane(100, 100);
    pop();
    grass3 = grass3 + 100;
  }

  let grass4 = -300;
  for (let i = 0; i < 3; i++) {
    push();
    texture(grassTextureTop);
    rotateX(90);
    translate(grass4, -300, 50.01);
    plane(100, 100);
    pop();
    grass4 = grass4 + 100;
  }

  let grass5 = -200;
  for (let i = 0; i < 5; i++) {
    push();
    texture(grassTextureTop);
    rotateX(90);
    translate(grass5, -400, 150.01);
    plane(100, 100);
    pop();
    grass5 = grass5 + 100;
  }

  let grass6 = -100;
  for (let i = 0; i < 4; i++) {
    push();
    texture(grassTextureTop);
    rotateX(90);
    translate(grass6, -500, 150.01);
    plane(100, 100);
    pop();
    grass6 = grass6 + 100;
  }

  let grass7 = 100;
  for (let i = 0; i < 2; i++) {
    push();
    texture(grassTextureTop);
    rotateX(90);
    translate(grass7, -300, 150.01);
    plane(100, 100);
    pop();
    grass7 = grass7 + 100;
  }

  push();
  texture(grassTextureTop);
  rotateX(90);
  translate(-300, -400, 50.01);
  plane(100, 100);
  pop();

  push();
  texture(grassTextureTop);
  rotateX(90);
  translate(200, -200, 150.01);
  plane(100, 100);
  pop();

  push();
  texture(torchTexture);
  rotateX(-25);
  translate(0, -130, -325);
  box(15, 80, 15);
  pop();

  // CLOUDS
  // push();
  // fill("#ffffff9c");
  // translate(-15, sin(frameCount / 5) * 30, 0);
  // box(300, 250, 300);
  // translate(60, -1200, -300);
  // box(300, 250, 300);
  // translate(-300, 0, 0);
  // box(300, 250, 300);
  // translate(0, 230, 0);

  // for (let i = 0; i < 20; i++) {
  //   let size = random(200, 300);
  //   let x = random(200, 300);
  //   let y = random(200, 300);

  //   push();
  //   fill("#ffffff9c");
  //   translate(x, y, -1000);
  //   box(size, 100);
  //   pop();
  // }

  // pop();

  push();
  texture(waterTexture);
  translate(-300.1, 450, -100.1);
  box(100, 1000, 100);
  pop();

  // flowers

  push();
  translate(100, -101, -100);
  rotateY(-20);
  texture(flower1);
  plane(100);
  pop();

  push();
  translate(-300, -101, -200);
  rotateY(-20);
  texture(poppyTexture);
  plane(100);
  pop();

  // DIRT LAYOUT

  push();
  translate(-100, -100, -550.1);
  rotateY(180);
  texture(grassTextureSide);
  plane(100);
  pop();

  push();
  translate(100, -100, -550.1);
  rotateY(180);
  texture(grassTextureSide);
  plane(100);
  pop();

  push();
  translate(0, -100, -550.1);
  rotateY(180);
  texture(grassTextureSide);
  plane(100);
  pop();

  push();
  translate(200, -100, -550.1);
  rotateY(180);
  texture(grassTextureSide);
  plane(100);
  pop();

  push();
  translate(250.1, -100, -500);
  rotateY(90);
  texture(grassTextureSide);
  plane(100);
  pop();

  push();
  translate(250.1, -100, -400);
  rotateY(90);
  texture(grassTextureSide);
  plane(100);
  pop();

  push();
  translate(250.1, -100, -300);
  rotateY(90);
  texture(grassTextureSide);
  plane(100);
  pop();

  push();
  translate(250.1, -100, -200);
  rotateY(90);
  texture(grassTextureSide);
  plane(100);
  pop();

  push();
  translate(250.1, 0, -100);
  rotateY(90);
  texture(grassTextureSide);
  plane(100);
  pop();

  push();
  translate(250.1, 0, 0);
  rotateY(90);
  texture(grassTextureSide);
  plane(100);
  pop();

  particleSystem.draw();
  pop();
}

function biomeDesert() {
  rotateX(-1);
  translate(0, -200, 300);
  background("#dedaba");
  // camera.lookAt(100, 0, -100);
  // camera.setPosition(0, tan(frameCount) * 200, 1000);

  // orbitControl();
  rotateY(0);

  directionalLight(255, 225, 120, 800, 400, -500);

  directionalLight(150, 150, 120, 800, 400, -500);
  directionalLight(150, 150, 120, -800, 400, 500);
  directionalLight(120, 120, 120, 800, 400, -500);
  directionalLight(120, 120, 120, -800, 400, -500);

  // rotateY(180);

  let dirt1 = -100;

  for (let i = 0; i < 3; i++) {
    push();
    texture(sandTexture);
    translate(dirt1, 0, 0);
    box(100);
    pop();
    dirt1 = dirt1 + 100;
  }

  let dirt2 = -500;

  for (let i = 0; i < 6; i++) {
    push();
    texture(sandTexture);
    translate(200, 0, dirt2);
    box(100);
    pop();
    dirt2 = dirt2 + 100;
  }

  let dirt3 = -200;

  for (let i = 0; i < 4; i++) {
    push();
    texture(sandTexture);
    translate(dirt3, 0, -500);
    box(100);
    pop();
    dirt3 = dirt3 + 100;
  }

  let dirt3Y = -100;

  for (let i = 0; i < 4; i++) {
    push();
    texture(sandTexture);
    translate(dirt3Y, -100, -500);
    box(100);
    pop();
    dirt3Y = dirt3Y + 100;
  }

  let dirt3Y2 = -200;

  for (let i = 0; i < 4; i++) {
    push();
    texture(sandTexture);
    translate(dirt3Y2, -100, -400);
    box(100);
    pop();
    dirt3Y2 = dirt3Y2 + 100;
  }

  let dirt3Z = -500;

  for (let i = 0; i < 4; i++) {
    push();
    texture(sandTexture);
    translate(200, -100, dirt3Z);
    box(100);
    pop();
    dirt3Z = dirt3Z + 100;
  }

  push();
  texture(sandTexture);
  translate(100, -100, -300);
  box(100);
  pop();

  let dirt4 = -500;

  for (let i = 0; i < 4; i++) {
    push();
    texture(sandTexture);
    translate(-300, 0, dirt4);
    box(100);
    pop();
    dirt4 = dirt4 + 100;
  }

  let dirt5 = -500;

  for (let i = 0; i < 4; i++) {
    push();
    texture(sandTexture);
    translate(-200, 0, dirt5);
    box(100);
    pop();
    dirt5 = dirt5 + 100;
  }

  let dirt6 = -500;

  for (let i = 0; i < 5; i++) {
    push();
    texture(sandTexture);
    translate(-100, 0, dirt6);
    box(100);
    pop();
    dirt6 = dirt6 + 100;
  }

  let dirt7 = -500;

  for (let i = 0; i < 5; i++) {
    push();
    texture(sandTexture);
    translate(00, 0, dirt7);
    box(100);
    pop();
    dirt7 = dirt7 + 100;
  }

  let dirt8 = -500;

  for (let i = 0; i < 5; i++) {
    push();
    texture(sandTexture);
    translate(100, 0, dirt8);
    box(100);
    pop();
    dirt8 = dirt8 + 100;
  }

  push();
  texture(sandTexture);
  translate(-200, 0, -100);
  box(100);
  pop();

  // DROPS

  push();
  texture(sandStoneTexture);
  translate(-200, 100, -100);
  box(100);
  pop();

  push();
  texture(sandTexture);
  translate(-300, 100, -200);
  box(100);
  pop();

  push();
  texture(sandTexture);
  translate(-300, 100, -300);
  box(100);
  pop();

  push();
  texture(sandStoneTexture);
  translate(-300, 200, -200);
  box(100);
  pop();

  push();
  texture(sandStoneTexture);
  translate(-200, 200, -100);
  box(100);
  pop();

  push();
  texture(sandStoneTexture);
  translate(-200, 300, -100);
  box(100);
  pop();

  push();
  texture(sandStoneTexture);
  translate(-100, 200, 0);
  box(100);
  pop();

  push();
  texture(sandTexture);
  translate(-100, 100, 0);
  box(100);
  pop();

  push();
  texture(sandStoneTexture);
  translate(-100, 300, 0);
  box(100);
  pop();

  push();
  texture(sandStoneTexture);
  translate(-100, 400, 0);
  box(100);
  pop();

  push();
  texture(sandStoneTexture);
  translate(-200, -100, -500);
  box(100);
  pop();

  push();
  texture(sandStoneTexture);
  translate(-300, 0, -500);
  box(100);
  pop();

  push();
  texture(sandStoneTexture);
  translate(0, 300, 0);
  box(100);
  pop();

  push();
  texture(sandStoneTexture);
  translate(200, 300, 0);
  box(100);
  pop();

  let stonedrop1 = 0;

  for (let i = 0; i < 3; i++) {
    push();
    texture(sandStoneTexture);
    translate(stonedrop1, 200, 0);
    box(100);
    pop();
    stonedrop1 = stonedrop1 + 100;
  }

  // STONE

  let stone1 = 0;

  for (let i = 0; i < 2; i++) {
    push();
    texture(sandTexture);
    translate(stone1, 100, 0);
    box(100);
    pop();
    stone1 = stone1 + 100;
  }

  let stone2 = -500;

  for (let i = 0; i < 6; i++) {
    push();
    texture(sandStoneTexture);
    translate(200, 100, stone2);
    box(100);
    pop();
    stone2 = stone2 + 100;
  }

  let stone3 = -200;

  for (let i = 0; i < 4; i++) {
    push();
    texture(sandStoneTexture);
    translate(stone3, 100, -500);
    box(100);
    pop();
    stone3 = stone3 + 100;
  }

  let stone4 = -500;

  for (let i = 0; i < 2; i++) {
    push();
    texture(sandStoneTexture);
    translate(-300, 100, stone4);
    box(100);
    pop();
    stone4 = stone4 + 100;
  }

  // TREE
  // log
  let log = -100;

  for (let i = 0; i < 4; i++) {
    push();
    texture(cactusTexture);
    translate(0, log, -300);
    box(100);
    pop();
    log = log - 90;
  }

  push();
  texture(lavaTexture);
  translate(-300.1, 450, -100.1);
  box(100, 1000, 100);
  pop();

  // Bush
  push();
  texture(bushTexture);
  translate(100, -100, -100);
  rotateY(-20);
  plane(100);
  pop();
}

function biomeWinter() {
  rotateX(-1);
  translate(0, -200, 300);
  background("#62a5bf");

  // orbitControl();
  // rotateY(0);

  directionalLight(255, 225, 255, 800, 400, -500);

  directionalLight(255, 225, 155, 800, 400, -500);
  directionalLight(255, 225, 120, -800, 400, 500);
  directionalLight(150, 150, 150, 800, 400, -500);
  directionalLight(150, 150, 150, -800, 400, -500);

  // rotateY(180);

  let dirt1 = -100;

  for (let i = 0; i < 3; i++) {
    push();
    texture(dirtSnowTexture);
    translate(dirt1, 0, 0);
    box(100);
    pop();
    dirt1 = dirt1 + 100;
  }

  let dirt2 = -500;

  for (let i = 0; i < 6; i++) {
    push();
    texture(dirtTexture);
    translate(200, 0, dirt2);
    box(100);
    pop();
    dirt2 = dirt2 + 100;
  }

  let dirt3 = -200;

  for (let i = 0; i < 4; i++) {
    push();
    texture(dirtSnowTexture);
    translate(dirt3, 0, -500);
    box(100);
    pop();
    dirt3 = dirt3 + 100;
  }

  let dirt3Y = -100;

  for (let i = 0; i < 4; i++) {
    push();
    texture(dirtSnowTexture);
    translate(dirt3Y, -100, -500);
    box(100);
    pop();
    dirt3Y = dirt3Y + 100;
  }

  let dirt3Y2 = -200;

  for (let i = 0; i < 4; i++) {
    push();
    texture(dirtSnowTexture);
    translate(dirt3Y2, -100, -400);
    box(100);
    pop();
    dirt3Y2 = dirt3Y2 + 100;
  }

  let dirt3Z = -500;

  for (let i = 0; i < 4; i++) {
    push();
    texture(dirtSnowTexture);
    translate(200, -100, dirt3Z);
    box(100);
    pop();
    dirt3Z = dirt3Z + 100;
  }

  push();
  texture(dirtSnowTexture);
  translate(100, -100, -300);
  box(100);
  pop();

  let dirt4 = -500;

  for (let i = 0; i < 4; i++) {
    push();
    texture(dirtSnowTexture);
    translate(-300, 0, dirt4);
    box(100);
    pop();
    dirt4 = dirt4 + 100;
  }

  let dirt5 = -500;

  for (let i = 0; i < 4; i++) {
    push();
    texture(dirtTexture);
    translate(-200, 0, dirt5);
    box(100);
    pop();
    dirt5 = dirt5 + 100;
  }

  let dirt6 = -500;

  for (let i = 0; i < 5; i++) {
    push();
    texture(dirtTexture);
    translate(-100, 0, dirt6);
    box(100);
    pop();
    dirt6 = dirt6 + 100;
  }

  let dirt7 = -500;

  for (let i = 0; i < 5; i++) {
    push();
    texture(dirtTexture);
    translate(00, 0, dirt7);
    box(100);
    pop();
    dirt7 = dirt7 + 100;
  }

  let dirt8 = -500;

  for (let i = 0; i < 5; i++) {
    push();
    texture(dirtTexture);
    translate(100, 0, dirt8);
    box(100);
    pop();
    dirt8 = dirt8 + 100;
  }

  push();
  texture(dirtSnowTexture);
  translate(-200, 0, -100);
  box(100);
  pop();

  // DROPS

  push();
  texture(stoneTexture);
  translate(-200, 100, -100);
  box(100);
  pop();

  push();
  texture(dirtTexture);
  translate(-300, 100, -200);
  box(100);
  pop();

  push();
  texture(dirtTexture);
  translate(-300, 100, -300);
  box(100);
  pop();

  push();
  texture(stoneTexture);
  translate(-300, 200, -200);
  box(100);
  pop();

  push();
  texture(stoneTexture);
  translate(-200, 200, -100);
  box(100);
  pop();

  push();
  texture(stoneTexture);
  translate(-200, 300, -100);
  box(100);
  pop();

  push();
  texture(stoneTexture);
  translate(-100, 200, 0);
  box(100);
  pop();

  push();
  texture(dirtTexture);
  translate(-100, 100, 0);
  box(100);
  pop();

  push();
  texture(stoneTexture);
  translate(-100, 300, 0);
  box(100);
  pop();

  push();
  texture(stoneTexture);
  translate(-100, 400, 0);
  box(100);
  pop();

  push();
  texture(stoneTexture);
  translate(-200, -100, -500);
  box(100);
  pop();

  push();
  texture(stoneTexture);
  translate(-300, 0, -500);
  box(100);
  pop();

  push();
  texture(stoneTexture);
  translate(0, 300, 0);
  box(100);
  pop();

  push();
  texture(stoneTexture);
  translate(200, 300, 0);
  box(100);
  pop();

  let stonedrop1 = 0;

  for (let i = 0; i < 3; i++) {
    push();
    texture(stoneTexture);
    translate(stonedrop1, 200, 0);
    box(100);
    pop();
    stonedrop1 = stonedrop1 + 100;
  }

  // FOX

  push();
  fill("#E27C21");
  translate(0, -70, -200);
  rotateY(-20);
  scale(0.5, 0.5, 0.5);
  push();
  box(200, 100, 100);
  pop();
  push();
  translate(0, 10, 100);
  texture(foxTailTexture);
  rotateZ(-90);
  box(80, 180, 80);
  pop();
  push();
  texture(foxTailTexture);
  rotateX(90);
  rotateZ(-90);
  translate(-100, 0, 30.1);
  plane(80, 180);
  pop();
  push();
  rotateY(-90);
  fill("#FFFFFF");
  translate(100, 5, 90.1);
  plane(80, 70);
  pop();
  push();
  rotateY(0);
  fill("#FFFFFF");
  translate(-150, 20, 90.1);
  plane(60, 50);
  pop();
  push();
  rotateY(0);
  fill("black");
  translate(-150, 5, 90.2);
  plane(30, 15);
  pop();
  push();
  rotateY(-90);
  fill("#E27C21");
  translate(100, 5, -90.1);
  plane(80, 70);
  pop();
  push();
  translate(-150, -5, 10);
  box(150, 110, 100);
  pop();
  push();
  translate(-150, 20, 70);
  box(60, 50, 40);
  pop();
  push();
  translate(-105, -75, 0);
  box(30, 30, 10);
  pop();
  push();
  translate(-200, -75, 0);
  box(30, 30, 10);
  pop();
  push();
  fill("white");
  translate(-200, -75, 5.5);
  plane(30, 30);
  pop();
  push();
  fill("white");
  translate(-105, -75, 5.5);
  plane(30, 30);
  pop();
  push();
  fill("black");
  translate(-207, -25, 60.5);
  plane(35, 15);
  pop();
  push();
  fill("black");
  translate(-100, -25, 60.5);
  plane(35, 15);
  pop();
  push();
  fill("#00000021");
  translate(-100, -40, 60.5);
  plane(35, 15);
  pop();
  push();
  fill("#00000021");
  translate(-207, -40, 60.5);
  plane(35, 15);
  pop();
  pop();

  // STONE

  let stone1 = 0;

  for (let i = 0; i < 2; i++) {
    push();
    texture(dirtTexture);
    translate(stone1, 100, 0);
    box(100);
    pop();
    stone1 = stone1 + 100;
  }

  let stone2 = -500;

  for (let i = 0; i < 6; i++) {
    push();
    texture(stoneTexture);
    translate(200, 100, stone2);
    box(100);
    pop();
    stone2 = stone2 + 100;
  }

  let stone3 = -200;

  for (let i = 0; i < 4; i++) {
    push();
    texture(stoneTexture);
    translate(stone3, 100, -500);
    box(100);
    pop();
    stone3 = stone3 + 100;
  }

  let stone4 = -500;

  for (let i = 0; i < 2; i++) {
    push();
    texture(stoneTexture);
    translate(-300, 100, stone4);
    box(100);
    pop();
    stone4 = stone4 + 100;
  }

  // TREE
  // log
  let log = -100;

  for (let i = 0; i < 4; i++) {
    push();
    texture(oakTexture);
    translate(0, log, -300);
    box(100);
    pop();
    log = log - 100;
  }

  // leaves

  let leaves = 100;

  for (let i = 0; i < 3; i++) {
    push();
    texture(leavesWTexture);
    translate(leaves, -400, -300);
    box(100);
    pop();
    leaves = leaves - 100;
  }

  let leaves1 = 100;

  for (let i = 0; i < 3; i++) {
    push();
    texture(leavesWTexture);
    translate(leaves1, -400, -400);
    box(100);
    pop();
    leaves1 = leaves1 - 100;
  }

  let leaves2 = 100;

  for (let i = 0; i < 3; i++) {
    push();
    texture(leavesWTexture);
    translate(leaves2, -400, -200);
    box(100);
    pop();
    leaves2 = leaves2 - 100;
  }

  let leaves3 = 100;

  for (let i = 0; i < 2; i++) {
    push();
    texture(leavesWTexture);
    translate(leaves3, -500, -300);
    box(100);
    pop();
    leaves3 = leaves3 - 200;
  }
  let leaves4 = -200;

  for (let i = 0; i < 2; i++) {
    push();
    texture(leavesWTexture);
    translate(0, -500, leaves4);
    box(100);
    pop();
    leaves4 = leaves4 - 200;
  }

  push();
  texture(leavesWTexture);
  translate(0, -600, -300);
  box(100);
  pop();

  let grass1 = -200;
  for (let i = 0; i < 5; i++) {
    push();
    texture(snowTexture);
    rotateX(90);
    translate(grass1, -100, 50.01);
    plane(100, 100);
    pop();
    grass1 = grass1 + 100;
  }

  let grass2 = -300;
  for (let i = 0; i < 5; i++) {
    push();
    texture(snowTexture);
    rotateX(90);
    translate(grass2, -200, 50.01);
    plane(100, 100);
    pop();
    grass2 = grass2 + 100;
  }

  let grass3 = -100;
  for (let i = 0; i < 4; i++) {
    push();
    texture(snowTexture);
    rotateX(90);
    translate(grass3, 0, 50.01);
    plane(100, 100);
    pop();
    grass3 = grass3 + 100;
  }

  let grass4 = -300;
  for (let i = 0; i < 3; i++) {
    push();
    texture(snowTexture);
    rotateX(90);
    translate(grass4, -300, 50.01);
    plane(100, 100);
    pop();
    grass4 = grass4 + 100;
  }

  let grass5 = -200;
  for (let i = 0; i < 5; i++) {
    push();
    texture(snowTexture);
    rotateX(90);
    translate(grass5, -400, 150.01);
    plane(100, 100);
    pop();
    grass5 = grass5 + 100;
  }

  let grass6 = -100;
  for (let i = 0; i < 4; i++) {
    push();
    texture(snowTexture);
    rotateX(90);
    translate(grass6, -500, 150.01);
    plane(100, 100);
    pop();
    grass6 = grass6 + 100;
  }

  let grass7 = 100;
  for (let i = 0; i < 2; i++) {
    push();
    texture(snowTexture);
    rotateX(90);
    translate(grass7, -300, 150.01);
    plane(100, 100);
    pop();
    grass7 = grass7 + 100;
  }

  push();
  texture(snowTexture);
  rotateX(90);
  translate(-300, -400, 50.01);
  plane(100, 100);
  pop();

  push();
  texture(snowTexture);
  rotateX(90);
  translate(200, -200, 150.01);
  plane(100, 100);
  pop();

  push();
  texture(torchTexture);
  rotateX(-25);
  translate(0, -130, -325);
  box(15, 80, 15);
  pop();

  // CLOUDS
  // push();
  // fill("#ffffff9c");
  // translate(-15, sin(frameCount / 5) * 30, 0);
  // box(300, 250, 300);
  // translate(60, -1200, -300);
  // box(300, 250, 300);
  // translate(-300, 0, 0);
  // box(300, 250, 300);
  // translate(0, 230, 0);

  // for (let i = 0; i < 20; i++) {
  //   let size = random(200, 300);
  //   let x = random(200, 300);
  //   let y = random(200, 300);

  //   push();
  //   fill("#ffffff9c");
  //   translate(x, y, -1000);
  //   box(size, 100);
  //   pop();
  // }

  // DIRT LAYOUT

  push();
  translate(-100, -100, -550.1);
  rotateY(180);
  texture(dirtSnowTexture);
  plane(100);
  pop();

  push();
  translate(100, -100, -550.1);
  rotateY(180);
  texture(dirtSnowTexture);
  plane(100);
  pop();

  push();
  translate(0, -100, -550.1);
  rotateY(180);
  texture(dirtSnowTexture);
  plane(100);
  pop();

  push();
  translate(200, -100, -550.1);
  rotateY(180);
  texture(dirtSnowTexture);
  plane(100);
  pop();

  push();
  translate(250.1, -100, -500);
  rotateY(90);
  texture(dirtSnowTexture);
  plane(100);
  pop();

  push();
  translate(250.1, -100, -400);
  rotateY(90);
  texture(dirtSnowTexture);
  plane(100);
  pop();

  push();
  translate(250.1, -100, -300);
  rotateY(90);
  texture(dirtSnowTexture);
  plane(100);
  pop();

  push();
  translate(250.1, -100, -200);
  rotateY(90);
  texture(dirtSnowTexture);
  plane(100);
  pop();

  push();
  translate(250.1, 0, -100);
  rotateY(90);
  texture(dirtSnowTexture);
  plane(100);
  pop();

  push();
  translate(250.1, 0, 0);
  rotateY(90);
  texture(dirtSnowTexture);
  plane(100);
  pop();

  push();
  translate(200, 0, 50.1);

  texture(dirtSnowTexture);
  plane(100);
  pop();

  // pop();

  push();
  texture(iceTexture);
  translate(-300.1, 0, -100.1);
  box(100, 100, 100);
  pop();

  particleSystem.draw();
}

function createSnowFlake() {
  const snow_flake = document.createElement("i");
  snow_flake.classList.add("fas");
  snow_flake.classList.add("fa-snowflake");
  snow_flake.style.left = Math.random() * window.innerWidth + "px";
  snow_flake.style.animationDuration = Math.random() * 3 + 2 + "s"; // between 2 - 5 seconds
  snow_flake.style.opacity = Math.floor(Math.random() * 0.3) + 1;
  snow_flake.style.fontSize = Math.floor(Math.random() * 15) + 5 + "px";

  document.body.appendChild(snow_flake);

  setTimeout(() => {
    snow_flake.remove();
  }, 5000);
}

//preventDefault()

let form = document.getElementById("form");
console.log(form);

function start() {
  init.style.display = "none";
  music = true;
  startGame = true;
  setInterval(changebiome, 8000);
  clic.play();
  currentMusic.play();
  contentDesc.style.display = "block";
}

function soundChange() {
  if (startGame == false) {
    if (music == true) {
      musicState.innerHTML = "Off";
      music = false;
    } else {
      musicState.innerHTML = "On";
      music = true;
    }
  }
}
