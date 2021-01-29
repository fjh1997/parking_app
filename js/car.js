var canvas =  document.createElement('canvas');

var context = canvas.getContext("2d");
canvas.width=20;
canvas.height=20;
var width = canvas.width, height =width;
var arr = { x: 10, y: 10 };
var scale=4;
var radius = 1*scale;
//创建构造函数Circle
function Circle(x, y, radius) {
    this.xx = x;//在画布内随机生成x值
    this.yy = y;
    this.radius = radius;
};
Circle.prototype.radiu = function () {
    radius += 0.05*scale; //每一帧半径增加0.5
    if (this.radius >= 2*scale) {
        radius = 1*scale;
    };
};
// 绘制圆形的方法
Circle.prototype.paint = function () {
    context.beginPath();
    context.arc(this.xx, this.yy, 0.5*scale, 0, Math.PI * 2);
    context.fillStyle = "rgba(0,200,255,1)";//填充颜色,默认是黑色
    context.fill();//画实心圆
    context.closePath();
    context.lineWidth = 0.2*scale; //线条宽度
    context.strokeStyle = 'rgba(0,200,255,1)'; //颜色
    context.stroke();
    this.paintkong();
    this.paintkong(0);
    this.paintkong(1);
    //  this.paintkong(20);
};
Circle.prototype.paintkong = function (num) {
    context.beginPath();
    context.arc(this.xx, this.yy, this.radius + num, 0, Math.PI * 2);
    context.closePath();
    context.lineWidth = 0.1*scale; //线条宽度
    context.strokeStyle = 'rgba(0,200,255,1)'; //颜色
    context.stroke();
};
//  创建
var newfun = null;
function createCircles() {
    newfun = new Circle(arr.x, arr.y, radius);//调用构造函数
    newfun.paint();
    newfun.radiu();
};
createCircles()
// 创建临时canvas
var backCanvas = document.createElement('canvas'),
    backCtx = backCanvas.getContext('2d');
backCanvas.width = width;
backCanvas.height = height;
//设置主canvas的绘制透明度
context.globalAlpha = 0.7;
//显示即将绘制的图像，忽略临时canvas中已存在的图像
backCtx.globalCompositeOperation = 'copy';
var carender = function () {
    //先将主canvas的图像缓存到临时canvas中
    backCtx.drawImage(canvas, 0, 0, width, height);
    //清除主canvas上的图像
    context.clearRect(0, 0, width, height);
    //在主canvas上画新圆
    createCircles();
    //新圆画完后，再把临时canvas的图像绘制回主canvas中
    context.drawImage(backCanvas, 0, 0, width, height);

};
var id = setInterval("carender()", 100);
