var canvas = document.getElementById('c'),
  ctx = canvas.getContext('2d');

var Width = 1000, Height = 700;
var y=400, g=0, // y 球的竖直距离，g 球掉落的距离
    B_Array=[''], B_width=70, B_top=100, B_x=[], B_kind=[]; // 障碍物
var bbb = Width - B_width;
var nowTime = new Date();
var nowsecond = nowTime.getTime();
var btn = document.getElementById('btn');
var p = document.getElementsByTagName('p')[0];

canvas.width = Width;
canvas.height = Height;

function gameStart() {
  if(btn.innerHTML == '重玩') {
    window.location.href = window.location.href
  }
  btn.style.display = 'none';
  ball = setInterval(function(){
    render();
  }, 7)
}

function mouseDown(){
  if(g==3) g = -g * 5;
}
document.onmousedown = mouseDown;
function keyDown(){
  if(g==3) g = -g * 5;
}
document.onkeydown = keyDown;

function render() {
  ctx.clearRect(0, 0, Width, Height);
  if(g<3) g++;
  y += g; // 球掉落
  renderBall();
  renderBarrier();
  barrierAdd();
  collisionTest();
}

function renderBall() {
  ctx.fillStyle = 'rgb(0,0,0)';
  ctx.fill();
  ctx.beginPath();
  ctx.arc(120, y, 30, 0, 2 * Math.PI, true);
  ctx.closePath();
}

function renderBarrier() {
  B_kind.push(Math.ceil(Math.random()*4)*100);
  ctx.fillStyle = 'rgb(50, 150, 250)';
  for(var i=0; i<B_Array.length; i++) {
    B_x[i] -= 3; // 障碍物移动速度
    ctx.fillRect(B_x[i], 0, 80, B_kind[i]); // 上柱子
    ctx.fillRect(B_x[i], B_kind[i] + 200, 80, Height - B_kind[i] - 200); // 下柱子
  }
}

function barrierAdd() {
  var nextTime = new Date();
  var nextsecond = nextTime.getTime();
  var diff = nextsecond - nowsecond;
  if(diff >= 1600) {
    B_x.push(bbb);
    nowsecond = nextsecond;
    B_x.push(bbb);
    B_Array.push('')
  }
}

function collisionTest() { // 球在x=120处 球半径r=30 柱子width=70
  for(var i = 0; i < B_Array.length; i++) {
    if(B_x[i] > 50 && B_x[i] < 120) { 
      if(y < B_kind[i] + 30 || y > B_kind[i] + 200 - 30) {
        console.log('1')
        console.log(B_x[i])
        btn.style.display = 'block';
        btn.innerHTML = '重玩';
        clearInterval(ball);
      } else {p.innerHTML = i};
    }; 
    if(B_x[i] > 20 && B_x[i] < 50) { // 球左半球到球出去 
      if(y < B_kind[i] + 15 || y > B_kind[i] + 200 - 15 ) {
        console.log('2')
        console.log(B_x[i])
        btn.style.display = 'block';
        btn.innerHTML = '重玩';
        clearInterval(ball);
      }
    }
    if(B_x[i] > 120 && B_x[i] < 150) { // 球进入到整个右半球没入 0-30
      if(y < B_kind[i] + 15 || y > B_kind[i] + 200 - 15 ) {
        console.log('3')
        console.log(B_x[i])
        btn.style.display = 'block';
        btn.innerHTML = '重玩';
        clearInterval(ball);
      }
    }
  }
}