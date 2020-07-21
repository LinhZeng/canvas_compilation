var c = document.getElementById('c'),
  ctx = c.getContext('2d'), // 获得上下文对象
   cw = c.width = 1000,
   ch = c.height = 600;
var rand = function(a, b) {
  return ~~((Math.random()*(b-a+1))+a); // ~取反，~~取反两次去掉小数部分
}
var dToR = function(degrees) {
  return degrees * (Math.PI / 180); // 角度化成弧度
}
var circle = {
  x: (cw / 2) + 5,
  y: (ch / 2) + 22,
  radius: 90,
  speed: 2,
  rotation: 0,
  angleStart: 270,
  angleEnd: 90,
  hue: 220,
  thickness: 18,
  blur: 25 // 模糊值
};
var partices = [];
var particleMax  = 100;

var updateCirle = function() {
  if(circle.rotation < 360) {
    circle.rotation += circle.speed;
  } else {
    circle.rotation = 0;
  }
},
renderCircle = function() {
  ctx.save(); // 将当前状态保存
  ctx.translate(circle.x, circle.y);
  ctx.rotate(dToR(circle.rotation));
  ctx.beginPath(); // 清空子路径，开始新路径
  ctx.arc(0, 0, circle.radius, dToR(circle.angleStart), dToR(circle.angleEnd), true);
  ctx.lineWidth = circle.thickness;
  ctx.strokeStyle = gradient1;
  ctx.stroke();
  ctx.restore();
},
renderCircleBorder = function() {
  ctx.save();
  ctx.translate(circle.x, circle.y);
  ctx.rotate(dToR(circle.rotation));
  ctx.beginPath();
  ctx.arc(0, 0, circle.radius + (circle.thickness / 2), dToR(circle.angleStart), dToR(circle.angleEnd), true);
  ctx.lineWidth = 2;
  ctx.strokeStyle = gradient2;
  ctx.stroke();
  ctx.restore();
},
renderCircleFlare = function() {
  ctx.save();
  ctx.translate(circle.x, circle.y);
  ctx.rotate(dToR(circle.rotation+185));
  ctx.scale(1,1); // 缩放
  ctx.beginPath();
  ctx.arc(0, circle.radius, 30, 0, Math.PI*2, false);
  ctx.closePath(); // 自动画出闭合
  var gradient3 = ctx.createRadialGradient(0, circle.radius, 0, 0, circle.radius, 30); // 放射性渐变（圆）
  gradient3.addColorStop(0, 'hsla(330, 50%, 50%, .35)'); //由一个偏移值和颜色值指定的断点到渐变
  gradient3.addColorStop(1, 'hsla(330, 50%, 50%, 0)');
  ctx.fillStyle = gradient3;
  ctx.fill();
  ctx.restore();
},
renderCircleFlare2 = function() {
  ctx.save();
  ctx.translate(circle.x, circle.y);
  ctx.rotate(dToR(circle.rotation+165));
  ctx.scale(1.5,1); // 缩放
  ctx.beginPath();
  ctx.arc(0, circle.radius, 25, 0, Math.PI*2, false);
  ctx.closePath(); // 自动画出闭合
  var gradient4 = ctx.createRadialGradient(0, circle.radius, 0, 0, circle.radius, 25); // 放射性渐变（圆）
  gradient4.addColorStop(0, 'hsla(30, 100%, 50%, .2)'); //由一个偏移值和颜色值指定的断点到渐变
  gradient4.addColorStop(1, 'hsla(30, 100%, 50%, 0)');
  ctx.fillStyle = gradient4;
  ctx.fill();
  ctx.restore();
},
createParticles = function() {
  if(partices.length < particleMax) {
    partices.push({
      x: (circle.x + circle.radius * Math.cos(dToR(circle.rotation-85))) + (rand(0, circle.thickness*2) - circle.thickness),
      y: (circle.y + circle.radius * Math.cos(dToR(circle.rotation-85))) + (rand(0, circle.thickness*2) - circle.thickness),
      vx: (rand(0, 100)-50)/1000,
      vy: (rand(0, 100)-50)/1000,
      radius: rand(1,6)/2,
      alpha: rand(10, 20)/100,
    })
  }
},
updateParticles = function() {
  var i = partices.length;
  while(i--) {
    var p = partices[i];
    p.vx += (rand(0, 100)-50)/750,
    p.vy += (rand(0, 100)-50)/750,
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= .01;
    if(p.alpha < .02) {
      partices.splice(i, 1);
    }
  }
},
renderParticles = function() {
  var i = partices.length;
  while(i--) {
    var p = partices[i];
    ctx.beginPath();
    ctx.fillRect(p.x, p.y, p.radius, p.radius);
    ctx.closePath();
    ctx.fillStyle = 'hsla(0, 0%, 100%,' + p.alpha + ')';
  }
},
clear = function() {
  ctx.globalCompositeOperation = 'destination-out'; // 属性设置要在绘制新形状时应用的合成操作的类型，destination-out现有内容保持在新图形不重叠的地方
  ctx.fillStyle = 'rgba(0,0,0,.1)';
  ctx.fillRect(0,0,cw,ch);
  ctx.globalCompositeOperation = 'lighter'; // lighter两个重叠图像的颜色是通过颜色值相加确定的
},
loop = function() {
  clear();
  updateCirle();
  renderCircle();
  renderCircleBorder();
  renderCircleFlare(); //头部光圈
  renderCircleFlare2(); // 头部光圈
  createParticles(); // 闪光
  updateParticles();
  renderParticles();
}

ctx.shadowBlur = circle.blur; //模糊阴影
ctx.shadowColor = 'hsla(' + circle.hue + ', 80%, 60%, 1)';
ctx.lineCap = 'round'; // 线段末端的属性

var gradient1 = ctx.createLinearGradient(0, -circle.radius, 0, circle.radius);
gradient1.addColorStop(0, 'hsla(' + circle.hue + ', 60%, 50%, .25)');
gradient1.addColorStop(1, 'hsla(' + circle.hue + ', 60%, 50%, 0)');

var gradient2 = ctx.createLinearGradient(0, -circle.radius, 0, circle.radius);
gradient2.addColorStop(0, 'hsla(' + circle.hue + ', 100%, 50%, 0)');
gradient2.addColorStop(0, 'hsla(' + circle.hue + ', 100%, 10%, .7)');
gradient2.addColorStop(0, 'hsla(' + circle.hue + ', 100%, 50%, 0)');


setInterval(loop, 16);