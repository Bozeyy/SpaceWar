const world = document.querySelector('#game');
const c = world.getContext('2d');

var btn = document.querySelector(".btn-play");

world.width = window.innerHeight;
world.height = window.innerHeight;
const tailleRef = world.width/25;
const tailleLaser = world.width/80

const imgVesseau = new Image();
imgVesseau.src = 'img/ship.png';

const imgVesseauEnemie = new Image();
imgVesseauEnemie.src = 'img/VesseauEnemie.png';

const imgLaser = new Image();
imgLaser.src = 'img/Laser.png';

// image D'explosions
const explo1 = new Image();
explo1.src = 'img/Explo/Explo1.png';
const explo2 = new Image();
explo2.src = 'img/Explo/Explo2.png';
const explo3 = new Image();
explo3.src = 'img/Explo/Explo3.png';
const explo4 = new Image();
explo4.src = 'img/Explo/Explo4.png';
const explo5 = new Image();
explo5.src = 'img/Explo/Explo5.png';


var coin = 0;
const TextCoin = document.querySelector('#coin');
const TextHealth = document.querySelector('.health');
const TextNbEnemyLeft = document.querySelector('.nbEnemyLeft')


let Continue = true;
let Pause = true;

let enemiesCreate = 0;

class Player {
    constructor() {
        this.health = 100;
        this.width = tailleRef;
        this.height = tailleRef;
        this.velocity = {
            x: 0,
            y: 0
        }
        this.position = {
            x: (world.width - this.width) / 2,
            y: world.height - this.height*1.3
        }
    }

    draw() {
        c.drawImage(imgVesseau, this.position.x, this.position.y, this.width, this.height);
    }

    update() {
        if (this.position.x + this.velocity.x > 0 && this.position.x + this.velocity.x < world.width - this.width) {
            this.position.x += this.velocity.x;
        }
        this.draw();
    }
}

class Projectile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.taille = 0;
    }

    draw() {
        //c.fillStyle = 'yellow';
        //c.fillRect(this.x, this.y, world.height/40, -this.taille);
        //c.drawImage(imgLaser ,this.x+((player.width-tailleLaser)/2), this.y, tailleLaser, -this.taille)
        c.drawImage(imgLaser, this.x+((player.width-tailleLaser)/2), this.y, tailleLaser, -this.taille)
    }

}
// liste de projectile
let projectiles = [];

class Enemy {
    constructor() {
        this.time = 0;
        this.width = tailleRef;
        this.height = tailleRef;
        this.velocity = {
            // nombre aléatoire entre -world.width/10 et world.width/10
            x: Math.random() * (world.width/100 - -world.width/100) + -world.width/100,
            y: world.width/100
        }
        this.position = {
            x: Math.random() * (world.width - this.width),
            y: 0 + this.height*1.3
        }
    }

    draw() {
        //c.fillStyle = 'red';
        //c.fillRect(this.position.x, this.position.y, this.width, this.height);
        c.drawImage(imgVesseauEnemie, this.position.x, this.position.y, this.width, this.height);
    }

    drawDeath() {
        c.fillStyle = 'red';
        if (this.time < 2) {
            c.drawImage(explo1, this.position.x, this.position.y, this.width, this.height);
        } else if (this.time < 4) {
            c.drawImage(explo2, this.position.x, this.position.y, this.width, this.height);
        } else if (this.time < 6) {
            c.drawImage(explo3, this.position.x, this.position.y, this.width, this.height);
        } else if (this.time < 8) {
            c.drawImage(explo4, this.position.x, this.position.y, this.width, this.height);
        } else if (this.time < 10) {
            c.drawImage(explo5, this.position.x, this.position.y, this.width, this.height);
        } 
    }

    update() {
        
        if (this.position.x + this.velocity.x > 0 && this.position.x + this.velocity.x < world.width - this.width) {
            this.position.x += this.velocity.x;
        }
        if (this.position.y + this.velocity.y > 0 && this.position.y + this.velocity.y < world.height - this.height) {
            this.position.y += this.velocity.y;
        }
        this.draw();
    }

    changerVelocity() {
        this.velocity.x = Math.random() * (world.width/100 - -world.width/100) + -world.width/100;
    }
}
// liste d'enemies
let enemies = [];
let enemiesDead = [];
const player = new Player();


class Vague {
    constructor() {
        this.vague = 1;
        this.nbEnemy = 10;
        this.nbEnemyLeft = 10;
    }


    newVague() {
        this.nbEnemy = (this.vague * 10) + (this.vague * 10)/2
        this.nbEnemyLeft = this.nbEnemy;
    }
}

const vague = new Vague();



let frames = 0;


function AnimationLoop() {
    // attendre 1 milliseconde
    setTimeout(function () {
        requestAnimationFrame(AnimationLoop);
    }, 1);

    c.clearRect(0, 0, world.width, world.height);
    if (Continue) {
        if (Pause) {
            // rendre le world invisible
            world.setAttribute("display", "none");
            console.log('pause');
        } else {
            player.update();
            
            if (player.health <= 0) {
                Pause = true;
            }

            projectiles.forEach((projectile, index) => {
                projectile.draw();
                if (projectile.taille < world.height ) {
                    projectile.taille += tailleRef;
                } else {
                    projectiles.splice(index, 1);
                }
            });

            enemies.forEach((enemy, index) => {
                enemy.update();
                // nombre aléatoire entre 0 et 4
                if (Math.random() * (4 - 0) + 0 > 3) {
                    enemy.changerVelocity();
                }
                if (enemy.position.y > world.height - tailleRef*1.4) {
                    enemies.splice(index, 1);
                    player.health -= 10;
                    vague.nbEnemyLeft--;
                    c.fillStyle = 'yellow';
                    // faire un rectagle
                    c.fillRect(0, world.height-tailleRef/4, world.width, tailleRef/4);
                }

                for (let i = 0; i < projectiles.length; i++) {
                    const projectile = projectiles[i];
                    if ( projectile.x < enemy.position.x + enemy.width && projectile.x + world.height/40 > enemy.position.x - enemy.width) {
                        if ( enemy.position.y > projectile.y - projectile.taille) {
                            enemies[index].width *= 4;
                            enemies[index].height *= 4;
                            enemies[index].position.x -= enemies[index].width/2;
                            enemies[index].position.y -= enemies[index].height/2;
                            enemiesDead.push(enemies[index]);
                            enemies.splice(index, 1);
                            coin++;
                            vague.nbEnemyLeft--;
                        }
                    }
                }
            });
            
            if (frames % 50 === 0 && enemiesCreate < vague.nbEnemy) {
                enemies.push(new Enemy());
                enemiesCreate++;
            }
            Update();

            enemiesDead.forEach((enemy, index) => {
                enemy.time++;
                if (enemy.time > 10) {
                    enemiesDead.splice(index, 1);
                } else {
                    enemy.drawDeath();
                }
            });
            
            
            
        }
    }
    frames++;
}


// methode jouer
function Play() {
    c.clearRect(0, 0, world.width, world.height);
    console.log('play');
    btn.parentNode.removeChild(btn);
    Pause = false;
    AnimationLoop();
}  


function Update() {
    TextCoin.innerHTML = coin;
    TextHealth.setAttribute("style", "width: " + player.health + "%");
    TextNbEnemyLeft.innerHTML = vague.nbEnemyLeft;
}











function Replay() {
    console.log('replay');
    if ( vague.nbEnemyLeft <= 0 ) {
        vague.vague++;
        vague.newVague();
        TextNbEnemyLeft.innerHTML = vague.nbEnemyLeft;
        enemiesCreate = 0;
    }
}




function acheterVie() {
    if (coin > 4 && player.health < 100 && vague.nbEnemyLeft < 1) {
        player.health += 10;
        coin -= 5;
        Update();
    }
}




// EventListeners
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowLeft':
            player.velocity.x = -tailleRef/2;
            break;
        case 'ArrowRight':
            player.velocity.x = tailleRef/2;
            break;
        case 'ArrowUp':
            const p = new Projectile(player.position.x, player.position.y);
            projectiles.push(p);
            break;

    }
});

document.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'ArrowLeft':
            player.velocity.x = 0;
            break;
        case 'ArrowRight':
            player.velocity.x = 0;
            break;
        case 'Escape':
            Pause();
            break;
    }
});
