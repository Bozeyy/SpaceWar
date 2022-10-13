const world = document.querySelector('#game');
const c = world.getContext('2d');

var btn = document.querySelector(".btn-play");

world.width = window.innerHeight;
world.height = window.innerHeight;
const tailleRef = world.width/25;

const imgVesseau = new Image();
imgVesseau.src = 'img/ship.png';


let Continue = true;

let Pause = true;

class Player {
    constructor() {
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
        //c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }

    update() {

        if (this.position.x + this.velocity.x > 0 && this.position.x + this.velocity.x < world.width - this.width) {
            this.position.x += this.velocity.x;
        }
        this.draw();
    }
}

const player = new Player();

let frames = 0;


function AnimationLoop() {
    requestAnimationFrame(AnimationLoop);
    c.clearRect(0, 0, world.width, world.height);
    if (Continue) {

        if (Pause) {
            // rendre le world invisible
            world.setAttribute("display", "none");
            console.log('pause');
        } else {
            player.update();
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














// EventListeners
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowLeft':
            player.velocity.x = -tailleRef/6;
            break;
        case 'ArrowRight':
            player.velocity.x = tailleRef/6;
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
