require('file-loader?name=[name].[ext]!./index.html');
require('./style.css');

let canvas = document.querySelector('#draw');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 4;

let drawing = false;
let lastX = 0;
let lastY = 0;

let hue = 0;

const range = {min: 10, max: 90};
let strokeSize = range.min;
let dir = 1;

let ctx = canvas.getContext('2d');
ctx.lineCap = 'round';
ctx.lineJoin = 'round';
ctx.lineWidth = range.min;

function draw(e) {
    if(!drawing) return;

    ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`
    ctx.lineWidth+= dir;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    [lastX, lastY] = [e.offsetX, e.offsetY];
    hue++;
    if(ctx.lineWidth < range.min || ctx.lineWidth > range.max) dir = -dir;
}

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => drawing = false);
canvas.addEventListener('mouseout', () => drawing = false);

canvas.addEventListener('mousedown', e => {
    drawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
