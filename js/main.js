const world = document.getElementById('game');
const c = world.getContext('2d');
const tailleRef = world.width / 50;


const imgVesseau = new Image();
imgVesseau.src = 'img/Vesseau.png';

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
            y: world.height - this.height 
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

const player = new Player();

let frames = 0;

AnimationLoop();

function AnimationLoop() {
    requestAnimationFrame(AnimationLoop);
    c.clearRect(0, 0, world.width, world.height);
    player.update();
    frames++;
}


// EventListeners
document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowLeft':
            player.velocity.x = -2;
            break;
        case 'ArrowRight':
            player.velocity.x = 2;
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
    }
});
