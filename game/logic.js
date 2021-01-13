const board = document.getElementById('gameboard');
const nivel = document.getElementById('level');
const b_nivel = document.getElementById('box_level');
const azul = document.getElementById('azul');
const rojo = document.getElementById('rojo');
const amarillo = document.getElementById('amarillo');
const verde = document.getElementById('verde');
const btn_start = document.getElementById('botton_start');
const btn_restart = document.getElementById('restart');
const LEVEL_END = 12;


btn_start.addEventListener('click', startGame);


class Game {
    constructor(){
        this.showSequence = this.showSequence.bind(this);
        this.chooseColor = this.chooseColor.bind(this);
        this.userMoveMouse = this.userMoveMouse.bind(this);
        this.clickColors = this.clickColors.bind(this);
        this.restartGame = this.restartGame.bind(this);
        this.launch();
        this.generateSequence();
        this.nextLevel();
    }
    launch(){
        btn_start.classList.add('hide');
        b_nivel.classList.add('show');
        this.level = 1;
        this.btn_colors = [
            azul,
            rojo,
            amarillo,
            verde
        ]
    }
    generateSequence(){
        this.sequence = new Array(LEVEL_END).fill(0).map(n => Math.floor(Math.random() * 4));
    }
    nextLevel(){
        document.getElementById('blevel').innerHTML = this.level;
        this.indexSequence = 0;
        this.loadSequence();
        setTimeout(() => {this.showSequence()}, 2000);
    }
    loadSequence(){
        board.classList.add('load');
        setTimeout(() => board.classList.remove('load'), 1500);
    }
    showSequence() {
        let endSequence = 0;
        // let time = 0;
        // console.log(time);
        for( let i = 0; i < (this.level * 2); i++){
            let color = this.sequence[i];
            setTimeout(() => this.turnOnColor(color), 800 * i);
            // console.log(endSequence);
            // time += 800 * i;
            endSequence = i;
            if(endSequence == ((this.level * 2) - 1)){
                setTimeout(() => {this.userMoveMouse(); this.clickColors()}, 1000 + (800 * i))} ;
        }
            // setTimeout(() => this.clickColors, 1000 * (this.level * 2)) ;
            // setTimeout(() => this.userMoveMouse, 1000 * (this.level * 2))} ;
            // if(endSequence == ((this.level * 2) - 1)){
        //     console.log('hagaze la luz');
        //     this.userMoveMouse(); this.clickColors();
        //     console.log(tiem);
        // }
        // endSequence = 0;
    }
    turnOnColor(color){
        this.btn_colors[color].classList.add('bright','move');
        setTimeout(() => this.turnOffColor(color), 200);
        // return endSequence = i;
    }
    turnOffColor(color){
        this.btn_colors[color].classList.remove('bright','move');
    }
    userMoveMouse(){
        this.btn_colors.map(color => color.classList.add('moves-user'));
    }
    userMoveMouseRm(){
        this.btn_colors.map(color => color.classList.remove('moves-user'));
    }
    clickColors(){
        this.btn_colors[0].addEventListener('click', this.chooseColor);
        this.btn_colors[1].addEventListener('click', this.chooseColor);
        this.btn_colors[2].addEventListener('click', this.chooseColor);
        this.btn_colors[3].addEventListener('click', this.chooseColor);
    }
    clickColorsRm(){
        this.btn_colors[0].removeEventListener('click', this.chooseColor);
        this.btn_colors[1].removeEventListener('click', this.chooseColor);
        this.btn_colors[2].removeEventListener('click', this.chooseColor);
        this.btn_colors[3].removeEventListener('click', this.chooseColor);
    }
    restartGame(ev){
        console.log(this, ev);
        debugger;
        btn_restart.classList.remove('show');
        this.generateSequence();
        this.nextLevel();
    }
    chooseColor(ev){
        const ind = parseInt(ev.target.dataset.color);
        if(ind === this.sequence[this.indexSequence]){
            this.turnOnColor(ind);
            console.log('bien')
            this.indexSequence++
            if(this.indexSequence == (this.level * 2)){
                this.level++;
                this.userMoveMouseRm();
                setTimeout(() => this.nextLevel(),1000);
                if(this.level > LEVEL_END){
                    console.log('whiiiiiii gano mk')
                }
            }
        }else{
            console.log('la cago');
            this.clickColorsRm();
            this.userMoveMouseRm();
            btn_restart.classList.add('show');
            btn_restart.addEventListener('click', this.restartGame);
        }
        console.log(this.indexSequence)
    }
}


function startGame() {
    let game = new Game();
}

