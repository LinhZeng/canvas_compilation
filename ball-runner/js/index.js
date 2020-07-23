var canvas = document.getElementById('c'),
  ctx = canvas.getContext('2d');
var wrap = document.querySelector('.game-wrap'),
   cover = document.querySelector('.game-cover');

function BallRunner(id, config) {
  this.config = {
    width: config.width ? config.width : 600,
    height: config.height ? config.height : 600,
    gameOver: config.gameOver ? config.gameOver : null,
  };
  this.width = canvas.width = this.config.width || this.canvas.offsetWidth
  this.height = canvas.height = this.config.height || this.canvas.offsetHeight
  this.bounds = canvas.getBoundingClientRect(); // 返回元素大小啊以及相对视口的位置
}

function initGame() {
  this.startsign = false;
  this._mx = 0;
  this.point = 0;
  thia.ball = new BallRunner(this.ctx, {
    
  })
}

canvas.style.width = canvas.width + 'px';
canvas.style.height = canvas.height + 'px';