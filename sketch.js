var girl,
    girlidleleftanm, girlidlerightanm,
    girljumpleftanm, girljumprightanm,
    girlrasteraleftanm, girlrasterarightanm,
    girlpousoleftanm, girlpousorightanm,
    girlrunningleftanm, girlrunningrightanm,
    girlIsJumping = false, girlIsRastera = false, girlIsRunning = false, girlanmrunning = false;

var leftScreenEdgeHitbox, rightScreenEdgeHitbox;

var borboleta, borboletaimgright, borboletaimgleft;

var enterLevel = false, LevelInput = null;

var villain, ObstaclesG;

var gameover = false;

var girlhitbox;

var movingSprite;

var borboletaverdeimg, borboletaamarelomarromimg, borboletamarromimg, borboletaazulimg,
    butterflyG;

var dialogo = 0, dialogostatus = "Nenhum", dialogued = true;

var edges, invisibleGround, tree, rock, rockG;

var placar, placarimg;

var left = true, right = false;

var houseImg, foresthousebgImg, butterfliesbgImg, treeandrockbgImg, temploImg, florestaencantadabg,
    templeBricksImg, tocha;

var level = -5;

var score = 0;

var availablelevels = -1;

var leftButton, rightButton, jumpButton, rasteraButton, interactButton,
    leftButtonPressedOrReleased = "released", rightButtonPressedOrReleased = "released";

function preload() {
    //background
    houseImg = loadImage("./assets/backgrounds/assets/house.png");
    foresthousebgImg = loadImage("./assets/backgrounds/forestbghouse.png");
    butterfliesbgImg = loadImage("./assets/backgrounds/fundoborboleta.jpg");
    treeandrockbgImg = loadImage("./assets/backgrounds/treeandrockbg.png");
    temploImg = loadImage("./assets/backgrounds/assets/templo.png");
    florestaencantadabg = loadImage("./assets/backgrounds/florestaencantadabackground.png");
    templeBricksImg = loadImage("./assets/backgrounds/templebricks.png");
    tocha = loadImage("./assets/backgrounds/assets/tochas/tocha1.png");

    //girl anms
    girlidleleftanm = loadAnimation("./assets/menina/idle/menina-idle-left.png",
        "./assets/menina/blink/menina-blink-left.png", "./assets/menina/idle/menina-idle-left.png");
    girlidlerightanm = loadAnimation("./assets/menina/idle/menina-idle-right.png",
        "./assets/menina/blink/menina-blink-right.png", "./assets/menina/idle/menina-idle-right.png");
    girljumpleftanm = loadAnimation("./assets/menina/jump/menina-jump1-left.png",
        "./assets/menina/jump/menina-jump2-left.png");//, "./assets/menina/jump/menina-jump3-left.png");
    girljumprightanm = loadAnimation("./assets/menina/jump/menina-jump1-right.png",
        "./assets/menina/jump/menina-jump2-right.png");//, "./assets/menina/jump/menina-jump3-right.png");
    girlrasteraleftanm = loadAnimation("./assets/menina/rastera/menina-rastera-left.png");
    girlrasterarightanm = loadAnimation("./assets/menina/rastera/menina-rastera-right.png");
    girlpousoleftanm = loadAnimation("./assets/menina/jump/menina-jump3-left.png");
    girlpousorightanm = loadAnimation("./assets/menina/jump/menina-jump3-right.png");
    girlrunningleftanm = loadAnimation("./assets/menina/running/menina-running1-left.png",
        "./assets/menina/running/menina-running2-left.png", "./assets/menina/running/menina-running3-left.png",
        "./assets/menina/running/menina-running4-left.png", "./assets/menina/running/menina-running5-left.png",
        "./assets/menina/running/menina-running6-left.png");
    girlrunningrightanm = loadAnimation("./assets/menina/running/menina-running1-right.png",
        "./assets/menina/running/menina-running2-right.png", "./assets/menina/running/menina-running3-right.png",
        "./assets/menina/running/menina-running4-right.png", "./assets/menina/running/menina-running5-right.png",
        "./assets/menina/running/menina-running6-right.png");

    //borboleta
    borboletaimgright = loadImage("./assets/borboletas/azul/borboleta-azul-right.png");
    borboletaimgleft = loadImage("./assets/borboletas/azul/borboleta-azul-left.png");
    borboletaamarelomarromimg = loadImage("./assets/borboletas/borboleta-marromamarelo-frente.png");
    borboletamarromimg = loadImage("./assets/borboletas/borboleta-marrom-frente.png");
    borboletaazulimg = loadImage("./assets/borboletas/borboleta-azul-frente.png");
    borboletaverdeimg = loadImage("./assets/borboletas/borboleta-verde-frente.png");

    placarimg = loadImage("./assets/rede.png");
}

function setup() {
    //Canvas
    createCanvas(windowWidth, windowHeight);

    var girlImg = createImg('./assets/menina/idle/menina-idle-right.png');
    girlImg.position(width - width - width - width, height - height - height - height);
    girlImg.size(150, 170);

    //Placar de borboletas
    placar = createSprite(45, height - 45, 10, 10);
    placar.addImage("placar", placarimg);
    placar.scale = 0.5;
    placar.visible = false;

    //Definindo frameDelays das animações da menina(girl)
    girlidleleftanm.frameDelay = 20;
    girlidlerightanm.frameDelay = 20;
    girljumpleftanm.frameDelay = 15;
    girljumprightanm.frameDelay = 15;
    girlrunningleftanm.frameDelay = 5;
    girlrunningrightanm.frameDelay = 5;

    //Criando o sprite borboleta
    borboleta = createSprite(width / 2, height / 2 + 50, 25, 25);
    borboleta.addImage("right", borboletaimgright);
    borboleta.addImage("left", borboletaimgleft);
    borboleta.changeImage("right", borboletaimgright);
    borboleta.visible = false;
    //borboleta.debug = true;
    borboleta.setCollider("rectangle", 0, 0, 135, 550);

    //Criando o sprite girl(menina)
    girl = createSprite(width / 2 + 75, height / 2 + 300, 25, 25);
    girl.addAnimation("idleleft", girlidleleftanm);
    girl.addAnimation("idleright", girlidlerightanm);
    girl.addAnimation("jumpleft", girljumpleftanm);
    girl.addAnimation("jumpright", girljumprightanm);
    girl.addAnimation("rasteraleft", girlrasteraleftanm);
    girl.addAnimation("rasteraright", girlrasterarightanm);
    girl.addAnimation("pousoleft", girlpousoleftanm);
    girl.addAnimation("pousoright", girlpousorightanm);
    girl.addAnimation("runningleft", girlrunningleftanm);
    girl.addAnimation("runningright", girlrunningrightanm);
    girl.changeAnimation("idleleft", girlidleleftanm);

    villain = createSprite(width - width - width, girl.y, 50, 75);

    //girl.debug = true;

    //Collider da girl
    girl.setCollider("rectangle", -5, -5, 115, 140);

    girlhitbox = createSprite(girl.x, girl.y, 0.0001, 0.0001);//girl.width, girl.height);
    girlhitbox.setCollider("rectangle", +5, - 30, 50, 120);
    girlhitbox.visible = false;
    //girlhitbox.debug = true;

    leftScreenEdgeHitbox = createSprite(10, height / 2, 25, height);
    leftScreenEdgeHitbox.visible = false;

    rightScreenEdgeHitbox = createSprite(width - 10, height / 2, 25, height);
    rightScreenEdgeHitbox.visible = false;

    //Chão pra menina pisar
    invisibleGround = createSprite(width / 2, height - 35, width, 25);
    invisibleGround.visible = false;

    //Árvore
    tree = createSprite(64, height / 2, 280, height);//**, **, **, 800
    tree.visible = false;

    //Criando grupos
    rockG = new Group();
    butterflyG = new Group();
    templeG = new Group();
    ObstaclesG = new Group();

    //Criando as escadas do templo
    templeStairs = createSprite(width / 2 / 2 + 10, height / 2 + 180, 230, 205);
    templeStairs.visible = false;

    //Criando a entrada do templo
    templeEntrance = createSprite(width / 2 / 2 + 8, height / 2 + 30, 82, 95);
    templeEntrance.visible = false;

    //Aonde a menina vai pisar no templo(a parte de fora do templo)
    //temple1 = createSprite(width / 2 / 2 + 10, height / 2 + 82, 325, 28);(works with: girl collider)
    //width / 2 / 2 + 10, height / 2 + 82, 600, 28(original)
    temple1 = createSprite(width / 2 / 2 + 10, height / 2 + 82, 400, 28);
    //(works with: girlhitbox collider and not girl collider)

    temple1.visible = false;
    //templeG.add(temple1);

    //Criando a rocha
    rock = createSprite(width - 180, height - 55, 390, 120);
    rock2 = createSprite(width - 600, height - 35, 450, 70);
    rock3 = createSprite(width - 500, height - 65, 300, 80);
    rock4 = createSprite(width - 700, height - 65, 150, 50);
    rock4.shapeColor = "orange";
    rock3.shapeColor = "red";
    rock2.shapeColor = "green";
    rock.shapeColor = "yellow";
    rock.visible = false;
    rock2.visible = false;
    rock3.visible = false;
    rock4.visible = false;

    //Adicionando ao grupo da rocha
    rockG.add(rock);
    rockG.add(rock2);
    rockG.add(rock3);
    rockG.add(rock4);

    //Criando os sprites de Edge
    edges = createEdgeSprites();

    movingSprite = girlhitbox;

    /*rasteraButton = createButton("");
    rasteraButton.class("normalButton");
    rasteraButton.position(width / 2 - 35, height - 75);
    rasteraButton.mousePressed();

    leftButton = createButton("");
    leftButton.class("normalButton");
    leftButton.position(rasteraButton.x - 75, rasteraButton.y);
    leftButton.mousePressed(() => {
        leftButtonPressedOrReleased = "pressed"

        girlanmrunning = true;
        movingSprite.x = movingSprite.x - 4.5;
        left = true;
        right = false;
        if (girlIsJumping == false) {
            girlIsRunning = true;
            girl.changeAnimation("runningleft", girlrunningleftanm);
            setColliders("running");
            //girl.changeAnimation("idleleft", girlidleleftanm);
        }*/
    /*if (keyWentDown("s") && girlIsJumping == false
        || keyWentDown(DOWN_ARROW) && girlIsJumping == false) {
        girlIsRunning = false;
        //girl.velocityY = girl.velocityY+0.8;
        girlanmrunning = false;
        girlIsRastera = true;
        movingSprite.velocityX = -9;
        girl.changeAnimation("rasteraleft", girlrasteraleftanm);
        setColliders("rastera");
        setTimeout(() => {
            //girl.velocityY = girl.velocityY+0.8;
            movingSprite.velocityX = 0;
            if (left == true) {
                girl.changeAnimation("idleleft", girlidleleftanm);
            }
            if (right == true) {
                girl.changeAnimation("idleright", girlidlerightanm);
            }
            setColliders("idle");
            girlIsRastera = false;
        }, 650);
    }*//*});
leftButton.mouseReleased(() => { leftButtonPressedOrReleased = "released"; });

rightButton = createButton("");
rightButton.class("normalButton");
rightButton.position(rasteraButton.x + 75, rasteraButton.y);
rightButton.mousePressed(() => { rightButtonPressedOrReleased = "pressed" });
rightButton.mouseReleased(() => { rightButtonPressedOrReleased = "released" });

jumpButton = createButton("");
jumpButton.class("normalButton");
jumpButton.position(rasteraButton.x, rasteraButton.y - 75);
jumpButton.mousePressed();

interactButton = createButton("");
interactButton.class("normalButton");
interactButton.mousePressed();*/
}

function draw() {
    if (keyDown("backSpace")) {
        if (level !== "Corre!") {
            enterLevel = true;
        }

    }

    if (enterLevel == true) {
        push();
        fill('cyan');
        stroke('green');
        textSize(22.5);
        textAlign("center");
        if (LevelInput == null) {
            LevelInput = createInput("").attribute("placeholder", "Level");
            LevelInput.position(width / 2 - 85, height / 2);//550, 400 
            girl.visible = false;
        }

        if (LevelInput !== null) {
            if (LevelInput.value() == "Corre!" && keyDown("Enter") && level !== "Corre!") {
                LevelInput.hide();
                turnLevel("Corre!");
                enterLevel = false;
                level = "Corre!";
            }
            text("Escreva levels secretos / não lançados para jogá-los", LevelInput.x + 75, LevelInput.y - 50);
        }
        pop();
    }

    if (enterLevel == false) {

        //para a menina colidir com o chão invisível
        movingSprite.collide(invisibleGround);
        movingSprite.collide(edges[2]);//Top/Up
        movingSprite.collide(edges);
        //girl.collide(edges);

        //console.log("girlhitbox: "+girlhitbox.x);
        //console.log("girl: "+girl.x);
        /*if(girl.x == girlhitbox.x){
            console.log("Mesmo X");
        }
        if(girl.y == girlhitbox.y - 32.5){
            console.log("Mesmo Y");
        }*/
        //girlhitbox.x = girl.x;
        //girlhitbox.y = girl.y + 32.5;
        if (movingSprite === girlhitbox) {
            girl.x = girlhitbox.x;
            girl.y = girlhitbox.y - 32.5;
            movingSprite.collide(leftScreenEdgeHitbox);
            movingSprite.collide(rightScreenEdgeHitbox);
        }

        if (level > availablelevels) {
            background("black");
            if (girl.visible == true) {
                placar.visible = false;
                girl.visible = false;
                tocha.visible = false;
            }
            push();
            textAlign("center");
            textSize(35);
            fill('cyan');
            stroke('green');
            text("Continua...", width / 2, height / 2);
            pop();
        }
        //Progamações Condicionais para cada level.
        if (level == -5) {
            background(foresthousebgImg);
            image(houseImg, 0 + 550, 0 + 400 - 330, width - 550, height - 100);
            girl.collide(edges);
            fill("cyan");
            stroke("white");
            textSize(45);
            text("Objetivo: Entrar Na Floresta", 10, 45);
        }

        if (level == -4) {
            background(treeandrockbgImg);
            fill("cyan");
            stroke("white");
            textSize(45);
            if (dialogostatus == "Não Terminado" && !girl.isTouching(borboleta)) {
                text("Objetivo: Falar Com A Borboleta", 10, 45);
            }

            if (dialogostatus == "Terminado") {
                text("Objetivo: Continuar", 10, 45);
            }

            movingSprite.collide(rockG);
            //girl.collide(borboleta);
            girl.collide(edges[1]);//Right
            //girl.collide(edges[2]);//Up
            girl.collide(edges[3]);//Down
            if (borboleta.visible == false) {
                borboleta.visible = true;
            }

            if (girl.isTouching(edges[0])) {//left edge
                /*girl.visible = false
                setTimeout(() => {
                    if(level == -4){
                        level = -3;
                        girl.visible = true;
                        movingSprite.x = width - 50;
                        invisibleGround.y = 578;
                        movingSprite.y = invisibleGround.y - 100;
                        borboleta.visible = false;
                        createPickUpButterfly(width / 2 - 250, invisibleGround.y - 100, 
                        25, 25, borboletaamarelomarromimg);
                        createPickUpButterfly(width / 2 + 250, invisibleGround.y - 65, 
                        25, 25, borboletamarromimg);
                    }
                }, 1500);*/
                turnLevel(-3);
            }

        }

        if (level == -3) {
            background(butterfliesbgImg);
            girl.collide(edges[1]);
            //girl.collide(edges[2]);
            girl.collide(edges[3]);
            fill("cyan");
            stroke("white");
            textSize(45);
            text("Objetivo: Entrar Ainda Mais Na Floresta", 10, 45);
            if (girl.isTouching(edges[0])) {//left edge
                /*girl.visible = false
                setTimeout(() => {
                    if(level == -3){
                        level = -1;
                        girl.visible = true;
                        girl.x = width - 50;
                        invisibleGround.y = invisibleGround.y + 78;
                        girl.y = invisibleGround.y - 100;
                        createPickUpButterfly(width / 2 + width / 2 / 2, invisibleGround.y - 50, 
                        25, 25, borboletaazulimg);
                        createPickUpButterfly(temple1.x + 245, temple1.y - 80, 
                        25, 25, borboletaverdeimg);
                    }
                }, 1500);*/
                turnLevel(-1);
            }
        }

        if (level == -1) {
            background(florestaencantadabg);
            image(temploImg, width / 2 / 25, height / 2 - 375, 750, 650);

            textSize(55);
            fill("cyan");
            stroke("lightblue");
            text("Objetivo: Entrar No Templo", 10, 45);

            girl.collide(edges);

            if (girl.y <= temple1.y - 55) {
                //girl.collide(templeG);
                movingSprite.collide(temple1);
            }

            if (girl.isTouching(templeEntrance) && keyDown("E")) {
                level = 1;
            }
        }

        if (level == "Corre!") {
            console.log("E");
            background(templeBricksImg);
            textSize(55);
            fill("cyan");
            stroke("lightblue");
            text("Objetivo: Fugir");

            girl.collide(edges);
            girl.collide(ObstaclesG);

            if (villain.isTouching(girl)) {
                gameover = true;
            }
            camera.position.x = girl.position.x;
            moveMovingSpriteRight();
            if (ObstaclesG.y > invisibleGround.y - 80 && ObstaclesG.y < invisibleGround.y - 40) {
                for (var obstacle of ObstaclesG) {
                    if (obstacle.y == invisibleGround.y - 50) {
                        obstacle.velocityY = 0;
                        obstacle.velocityX = 0;
                    }
                }
            }

        }

        if (level > -4 && level <= availablelevels || level == -4 && dialogostatus == "Terminado") {
            textSize(55);
            fill("cyan");
            stroke("white");
            text("" + score, placar.x + 65, placar.y + 12);
            placar.visible = true;
        }

        if (level > -1 && level <= availablelevels) {
            background(templeBricksImg);
            image(tocha, width / 2, height / 2, 105, 105);
        }

        if (gameover == false) {

            if (dialogostatus == "Terminado" && level == -4) {
                if (girl.x > borboleta.x) {
                    borboleta.changeImage("right", borboletaimgright);
                }
                if (girl.x < borboleta.x) {
                    borboleta.changeImage("left", borboletaimgleft);
                }
            }

            //Para quando a menina tocar numa borboleta PEGÁVEL: a borboleta se destroi e aumenta a pontuação em 1.
            if (girl.isTouching(butterflyG)) {
                for (var butterfly of butterflyG) {
                    if (girl.isTouching(butterfly)) {
                        butterfly.destroy();
                        score = score + 1;
                    }

                }

            }

            //if(level !== -5 && !keyDown(UP_ARROW) && !keyDown("W") && !keyDown("space")){
            //    girl.velocityY = girl.velocityY+0.8;
            //}

            //Progamações Condicionais para fazer o dialogo entre a menina e a borboleta funcionarem.
            if (girl.isTouching(borboleta) && keyWentDown("E")
                && dialogo == 0 && dialogostatus == "Não Terminado") {// && level == -4){

                dialogo = 1;
                dialogostatus = "Falando";
                dialogued = true;


            } else if (girl.x < borboleta.x && level == -4 && dialogostatus == "Não Terminado"
                || girl.x < borboleta.x && level == -4 && dialogostatus == "Falando") {
                movingSprite.x = borboleta.x + 65;
            }

            if (girl.isTouching(borboleta) && dialogo == 0 && dialogostatus == "Não Terminado") {
                textAlign("center");
                textSize(55);
                fill("white");
                stroke("black");
                if (level == -4) {
                    text("Pressione E para conversar", width / 2, 45);
                }


            }

            if (dialogo !== 0) {
                if (dialogued == false) {
                    push();
                    textAlign("center");
                    textSize(55);
                    fill("white");
                    stroke("black");
                    textSize(18);
                    if (dialogo == 3 && level == -4) {
                        text("Pressione Esc para sair.", width / 2, 85);

                    }
                    else {

                        text("Pressione E para continuar.", width / 2, 85);

                    }
                    pop();
                }
                textAlign("center");
                textSize(55);
                fill("#4169E1");//blue
                stroke("lightblue");
                if (level == -4) {
                    push();
                    if (dialogo == 1) {

                        //textSize(55);
                        //fill("lightblue");
                        text("Olá! Preciso da sua ajuda!", width / 2, 45);
                        if (keyWentDown("E") && dialogued == false) {
                            dialogo = 2;
                            dialogued = true;
                        }
                        /*setTimeout(() => {
                            if(dialogued == true && dialogo == 1 && level == -4){
                                dialogued = false;
                            }
                        }, 1500);*/
                    }

                    if (dialogo == 2) {

                        text("Minhas amigas desapareceram! Você pode me ajudar?", width / 2, 45);
                        if (keyWentDown("E") && dialogued == false) {
                            dialogo = 3;
                            dialogued = true;
                        }

                        /*setTimeout(() => {
                            if(dialogued == true && dialogo == 2 && level == -4){
                                dialogued = false;
                            }
                        }, 1500);*/
                    }


                    if (dialogo == 3) {
                        push();
                        fill("pink");
                        text("Sim, Vou te ajudar!", width / 2, 45);
                        if (keyWentDown("esc") && dialogued == false) {
                            dialogo = 0;
                            dialogued = true;
                            dialogostatus = "Terminado";
                        }
                        /*setTimeout(() => {
                            if(dialogued == true && dialogo == 3 && level == -4){
                                dialogued = false;
                            }
                        }, 1500);*/
                        pop();
                    }
                    setTimeout(() => {
                        if (dialogued == true) {
                            dialogued = false;
                        }
                    }, 1500);
                    pop();
                }

            }

            //Se uma dessas teclas for pressionada, E a velocidade Y da menina for 0, E o dialogo(variável) for 0, E
            //girlIsRastera é false: a menina vai subir escadas se estiver perto de uma, se NÃO a menina vai pular
            //girlIsJumping é true, a animação e collider mudam.
            if (keyDown(UP_ARROW) && movingSprite.velocityY == 0 && dialogo == 0 && girlIsRastera == false
                || keyDown("w") && movingSprite.velocityY == 0 && dialogo == 0 && girlIsRastera == false
                || keyDown("space") && movingSprite.velocityY == 0 && dialogo == 0 && girlIsRastera == false) {
                if (girl.isTouching(templeStairs) && level == -1) {
                    movingSprite.y = movingSprite.y - 4.5;
                } else {
                    movingSprite.velocityY = -10;
                    girlIsJumping = true;
                    if (left == true) {
                        girl.changeAnimation("jumpleft", girljumpleftanm);
                    }
                    if (right == true) {
                        girl.changeAnimation("jumpright", girljumprightanm);
                    }
                    setColliders("jump");
                }

            }

            //Progamação Condicional para mudar girlIsJumping para false, fazer a animação de pouso e mudar para idle
            //Quando tocar no chão
            if (girlIsJumping == true && movingSprite.velocityY == 0) {
                girlIsJumping = false;
                if (left == true) {
                    girl.changeAnimation("pousoleft", girlpousoleftanm);
                    setColliders("pouso");
                    setTimeout(() => {
                        if (girlIsRastera == false) {
                            girl.changeAnimation("idleleft", girlidleleftanm);
                            setColliders("idle");
                        }
                    }, 400);
                }
                if (right == true) {
                    girl.changeAnimation("pousoright", girlpousorightanm);
                    setColliders("pouso");
                    setTimeout(() => {
                        if (girlIsRastera == false) {
                            girl.changeAnimation("idleright", girlidlerightanm);
                            setColliders("idle");
                        }
                    }, 400);
                }
            }

            //Progamação Condicional para mudar a animação pra direita e esquerda(dependendo pra onde a menina está
            //Olhando), E mudar o collider
            if (girlIsJumping == true && !movingSprite.velocityY == 0) {
                if (left == true) {
                    girl.changeAnimation("jumpleft", girljumpleftanm);
                }
                if (right == true) {
                    girl.changeAnimation("jumpright", girljumprightanm);
                }
                setColliders("jump");
            }

            //Progamação Condicional para mudar a animação da menina, definir girlIsRunning E girlanmrunning para false,
            //E mudar o collider da menina Quando a menina estiver parada.
            if (girlIsRunning == true && girlanmrunning == true && level !== "Corre!"
                && girlIsJumping == false && girlIsRastera == false && level !== "Corre!") {
                girlIsRunning = false;
                girlanmrunning = false;
                if (left == true) {
                    girl.changeAnimation("idleleft", girlidleleftanm);
                }
                if (right == true) {
                    girl.changeAnimation("idleright", girlidlerightanm);
                }
                setColliders("idle");
            }

            //if(keyDown(DOWN_ARROW)||keyDown("S")){
            //    girl.y = girl.y +3;
            //}

            //Se apertar uma dessas teclas(seta da direita ou D), E a menina NÃO estiver rastera
            //Se girlIsJumping é false: girlIsRunning é true e muda a animação e collider da menina
            //Se a menina apertar uma dessas teclas(seta de baixo ou s), E girlIsJumping é false.(só irá funcionar
            //(Se segurar/apertar uma das teclas pra andar).
            if (level !== "Corre!") {

                if (keyDown(RIGHT_ARROW) && girlIsRastera == false && !keyDown(LEFT_ARROW) && !keyDown("A")
                    || keyDown("D") && girlIsRastera == false && !keyDown("A") && !keyDown(LEFT_ARROW)) {
                    girlanmrunning = true;
                    movingSprite.x = movingSprite.x + 4.5;
                    left = false;
                    right = true;
                    if (girlIsJumping == false) {
                        girlIsRunning = true;
                        girl.changeAnimation("runningright", girlrunningrightanm);
                        setColliders("running");
                        //girl.changeAnimation("idleright", girlidlerightanm);
                    }
                    if (keyWentDown("s") && girlIsJumping == false
                        || keyWentDown(DOWN_ARROW) && girlIsJumping == false) {
                        girlIsRunning = false;
                        //girl.velocityY = girl.velocityY+0.8;
                        girlanmrunning = false;
                        girlIsRastera = true;
                        movingSprite.velocityX = +9;
                        girl.changeAnimation("rasteraright", girlrasterarightanm);
                        setColliders("rastera");
                        setTimeout(() => {
                            //girl.velocityY = girl.velocityY+0.8;
                            movingSprite.velocityX = 0;
                            if (left == true) {
                                girl.changeAnimation("idleleft", girlidleleftanm);
                            }
                            if (right == true) {
                                girl.changeAnimation("idleright", girlidlerightanm);
                            }
                            setColliders("idle");
                            girlIsRastera = false;
                        }, 650);
                    }

                }


                //Se apertar uma dessas teclas(seta da esquerda ou A), E a menina NÃO estiver rastera
                //Se girlIsJumping é false: girlIsRunning é true e muda a animação e collider da menina
                //Se a menina apertar uma dessas teclas(seta de baixo ou s), E girlIsJumping é false.(só irá funcionar
                //(Se segurar/apertar uma das teclas pra andar).
                if (keyDown(LEFT_ARROW) && girlIsRastera == false && !keyDown(RIGHT_ARROW) && !keyDown("D")
                    || keyDown("A") && girlIsRastera == false && !keyDown("D") && !keyDown(RIGHT_ARROW)) {
                    girlanmrunning = true;
                    movingSprite.x = movingSprite.x - 4.5;
                    left = true;
                    right = false;
                    if (girlIsJumping == false) {
                        girlIsRunning = true;
                        girl.changeAnimation("runningleft", girlrunningleftanm);
                        setColliders("running");
                        //girl.changeAnimation("idleleft", girlidleleftanm);
                    }
                    if (keyWentDown("s") && girlIsJumping == false
                        || keyWentDown(DOWN_ARROW) && girlIsJumping == false) {
                        girlIsRunning = false;
                        //girl.velocityY = girl.velocityY+0.8;
                        girlanmrunning = false;
                        girlIsRastera = true;
                        movingSprite.velocityX = -9;
                        girl.changeAnimation("rasteraleft", girlrasteraleftanm);
                        setColliders("rastera");
                        setTimeout(() => {
                            //girl.velocityY = girl.velocityY+0.8;
                            movingSprite.velocityX = 0;
                            if (left == true) {
                                girl.changeAnimation("idleleft", girlidleleftanm);
                            }
                            if (right == true) {
                                girl.changeAnimation("idleright", girlidlerightanm);
                            }
                            setColliders("idle");
                            girlIsRastera = false;
                        }, 650);
                    }
                }

            }
            //console.log(girlanmrunning);console.log(girlIsRunning);
            /*if(keyDown("A") && keyDown("D") && girlanmrunning == true
            ||keyDown(LEFT_ARROW)){
                girlanmrunning = false
                girlIsRunning = false;
                if(left == true){
                    girl.changeAnimation("idleleft", girlidleleftanm);
                }
                if(right == true){
                    girl.changeAnimation("idleright", girlidlerightanm);
                }
                girl.setColliders("idle");
            }*/

            //Pare definir girlIsRunning para false quando a menina NÃO estiver correndo
            if (keyWentUp("A") && !keyDown("D") && girlIsRastera == false && girlIsRunning == true
                || keyWentUp("D") && !keyDown("A") && girlIsRastera == false && girlIsRunning == true) {
                girlIsRunning = false;
            }

            //Gravidade da menina
            if (girlIsJumping == true || girlIsRastera == true || girlIsRunning) {
                movingSprite.velocityY = movingSprite.velocityY + 0.8;
            } else if (!movingSprite.isTouching(templeStairs) && level == -1) {
                movingSprite.velocityY = movingSprite.velocityY + 0.8;
            }

            //Gravidade da menina para ela subir a escada
            if (movingSprite.velocityY > 0 && movingSprite.isTouching(templeStairs) && level == -1) {
                movingSprite.velocityY = 0;
            }

            //pra passar do level -5 para -4
            if (girl.isTouching(tree) && level == -5) {
                turnLevel(-4);
                //girl.visible = false;
                /*setTimeout(() => {
                    if(level == -5){
                        level = -4;
                        girl.visible = true;
                        girl.x = width - 10;
                        dialogostatus = "Não Terminado";
                        //clear();
        
                    }
                    
                  }, 1500);*/
            }

        }//Gameover == false

        //drawSprites
        drawSprites();
    }//enterLevel == false
}

//Função para definir os colliders da menina
function setColliders(anim) {
    if (anim == "running" || anim == "idle" || anim == "rastera"
        || anim == "jump" || anim == "falling") {
        if (left == true) {
            girl.setCollider("rectangle", -5, -5, 115, 140);
            girlhitbox.setCollider("rectangle", +5, - 30, 50, 120);
        }
        if (right == true) {
            girl.setCollider("rectangle", +5, -5, 115, 140);
            girlhitbox.setCollider("rectangle", -5, - 30, 50, 120);
        }
    }

    if (anim == "pouso") {
        if (left == true) {
            girl.setCollider("rectangle", 0, -5, 115, 140);
        }
        if (right == true) {
            girl.setCollider("rectangle", 0, -5, 115, 140);
        }
    }

    if (anim == "jump") {

    }

    if (anim == "idle") {

    }

    if (anim == "running") {

    }

    if (anim == "rastera") {

    }

    if (anim == "falling") {

    }

}

function createPickUpButterfly(x, y, w, h, image) {
    var butterfly = createSprite(x, y, w, h);
    butterfly.addImage("butterflyimg", image);
    //butterfly.debug = true;
    butterflyG.add(butterfly);
}

function createMovingPart(x, y, w, h, velocity) {
    var obstacle = createSprite(x, y, w, h);
    obstacle.velocityY = velocity;
    ObstaclesG.add(obstacle);
}

function turnLevel(levelchosen, butterflyNumberExpectedAtThatChosenLevel) {
    if (levelchosen == -5 || levelchosen == -4 || levelchosen == -3 || levelchosen == -1
        || levelchosen == "Corre!") {
        butterflyG.destroyEach();
        girl.visible = false;
        setTimeout(() => {
            borboleta.visible = false;
        }, 1500);
        dialogostatus = "Nenhum";
        dialogo = 0;
        if (levelchosen == -1) {
            setTimeout(() => {
                if (level !== -1) {
                    if (butterflyNumberExpectedAtThatChosenLevel == true) {
                        score = 2;
                    }
                    level = -1;
                    girl.visible = true;
                    movingSprite.x = width - 50;
                    invisibleGround.y = 578;
                    invisibleGround.y = invisibleGround.y + 78;
                    movingSprite.y = invisibleGround.y - 100;
                    createPickUpButterfly(width / 2 + width / 2 / 2, invisibleGround.y - 50,
                        25, 25, borboletaazulimg);
                    createPickUpButterfly(temple1.x + 245, temple1.y - 80,
                        25, 25, borboletaverdeimg);
                }
            }, 1500);
        }
        if (levelchosen == -4) {
            setTimeout(() => {
                if (level !== -4) {
                    if (butterflyNumberExpectedAtThatChosenLevel == true) {
                        score = 0;
                    }
                    level = -4;
                    girl.visible = true;
                    dialogostatus = "Não Terminado";
                    if (movingSprite === girlhitbox) {
                        movingSprite.x = width - 20;
                    } else {
                        movingSprite.x = width - 10;
                    }
                }
            }, 1500);
        }
        if (levelchosen == -3) {
            setTimeout(() => {
                if (level !== -3) {
                    if (butterflyNumberExpectedAtThatChosenLevel == true) {
                        score = 0;
                    }
                    level = -3;
                    girl.visible = true;
                    movingSprite.x = width - 50;
                    invisibleGround.y = 578;
                    movingSprite.y = invisibleGround.y - 100;
                    createPickUpButterfly(width / 2 - 250, invisibleGround.y - 100,
                        25, 25, borboletaamarelomarromimg);
                    createPickUpButterfly(width / 2 + 250, invisibleGround.y - 65,
                        25, 25, borboletamarromimg);
                }
            }, 1500);
        }
        if (levelchosen == -5) {
            setTimeout(() => {
                if (level !== -5) {
                    if (butterflyNumberExpectedAtThatChosenLevel == true) {
                        score = 0;
                    }
                    level = -5;
                    girl.visible = true;
                    movingSprite.x = width / 2 + 75;
                    movingSprite.y = height / 2 + 300;
                }
            }, 1500);
        }

        if (levelchosen == "Corre!") {
            if (level !== "Corre!") {
                level = "Corre!";
                villain.x = 10;
                movingSprite.x = villain.x + 165;
                villain.velocityX = 4.7;
                girl.visible = true;
                invisibleGround.visible = true;
                invisibleGround.color = "gray";
                invisibleGround.height = 70;
                createMovingPart(width / 2, height + 70, 25, 55, -1.5);
            }
        }


    }
}

function moveMovingSpriteRight() {
    if (gameover == false) {
        if (level !== "Corre!") {
            if (keyDown(RIGHT_ARROW) && girlIsRastera == false && !keyDown(LEFT_ARROW) && !keyDown("A")
                || keyDown("D") && girlIsRastera == false && !keyDown("A") && !keyDown(LEFT_ARROW)) {
                girlanmrunning = true;
                movingSprite.x = movingSprite.x + 4.5;
                left = false;
                right = true;
                if (girlIsJumping == false) {
                    girlIsRunning = true;
                    girl.changeAnimation("runningright", girlrunningrightanm);
                    setColliders("running");
                    //girl.changeAnimation("idleright", girlidlerightanm);
                }
                if (keyWentDown("s") && girlIsJumping == false
                    || keyWentDown(DOWN_ARROW) && girlIsJumping == false) {
                    girlIsRunning = false;
                    //girl.velocityY = girl.velocityY+0.8;
                    girlanmrunning = false;
                    girlIsRastera = true;
                    movingSprite.velocityX = +9;
                    girl.changeAnimation("rasteraright", girlrasterarightanm);
                    setColliders("rastera");
                    setTimeout(() => {
                        //girl.velocityY = girl.velocityY+0.8;
                        movingSprite.velocityX = 0;
                        if (left == true) {
                            girl.changeAnimation("idleleft", girlidleleftanm);
                        }
                        if (right == true) {
                            girl.changeAnimation("idleright", girlidlerightanm);
                        }
                        setColliders("idle");
                        girlIsRastera = false;
                    }, 650);
                }

            }
        }
        else {
            if (girlIsRastera == false) {
                girlanmrunning = true;
                movingSprite.x = movingSprite.x + 4.5;
                left = false;
                right = true;
                if (girlIsJumping == false) {
                    girlIsRunning = true;
                    girl.changeAnimation("runningright", girlrunningrightanm);
                    setColliders("running");
                    //girl.changeAnimation("idleright", girlidlerightanm);
                }
            }

            if (keyWentDown("s") && girlIsJumping == false && girlIsRastera == false
                || keyWentDown(DOWN_ARROW) && girlIsJumping == false && girlIsRastera == false) {
                girlIsRunning = false;
                //girl.velocityY = girl.velocityY+0.8;
                girlanmrunning = false;
                girlIsRastera = true;
                movingSprite.velocityX = +9;
                girl.changeAnimation("rasteraright", girlrasterarightanm);
                setColliders("rastera");
                setTimeout(() => {
                    //girl.velocityY = girl.velocityY+0.8;
                    movingSprite.velocityX = 0;
                    if (left == true) {
                        girl.changeAnimation("idleleft", girlidleleftanm);
                    }
                    if (right == true) {
                        girl.changeAnimation("idleright", girlidlerightanm);
                    }
                    setColliders("idle");
                    girlIsRastera = false;
                }, 650);
            }
        }
    }


}

