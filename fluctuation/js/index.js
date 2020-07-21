var c = document.getElementById('c'),
  ctx = c.getContext('2d');
var w, h, x0, y0, x, y, t=0, t_step=1/20, tmp,
    exp = Math.exp, pow = Math.pow, sqrt = Math.sqrt,
    PI = Math.PI, sin = Math.sin, cos = Math.cos;

var rand = function(max, min) { //两数之间的随机数
  var b = (max === 0 || max) ? max : 1, a = min || 0;
  return a + (b - a) * Math.random();
} 

var trimUnit = function(input_str, unit) { // 分离单位
  return parseInt(input_str.split(unit)[0], 10);
}

var initCanvas = function() {
  var s = getComputedStyle(c);
  w = c.width = trimUnit(s.width, 'px');
  h = c.height = trimUnit(s.height, 'px');
}

var wave = function() {
  x0 = -1, y0 = h/2;
  ctx.clearRect(0, 0, w, h); //设定指定区域内所有像素变成透明
  tmp = pow(t, 1.75)/19;
  for(x = 0; x < w; x = x + 3) {
    y = 9*sqrt(x)*sin(x/23/PI + t/3 + sin(x/29+t))  
             + 32*sin(t)*cos(x/19 + t/7) 
             + 16*cos(t)*sin(sqrt(x) + rand(3, 2)*tmp) + h/2;
    ctx.beginPath();           
    ctx.moveTo(x0, y0);
    ctx.lineTo(x, y);
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'hsl(' + (2*x/w + t)*180 + ', 100%, 65%)';
    ctx.stroke();
    x0 = x;
    y0 = y;
  }
  t += t_step;
  requestAnimationFrame(wave); // 下次重绘之前调用指定函数更新动画
}

setTimeout(function() {
  initCanvas();
  wave();
  addEventListener('resize', initCanvas, false)
}, 15)