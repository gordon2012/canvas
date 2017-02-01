require('file-loader?name=[name].[ext]!./index.html');
require('./style.css');

let canvas = document.querySelector('#draw');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 4;

let drawing = false;
let lastX = 0;
let lastY = 0;

let ctx = canvas.getContext('2d');
ctx.lineCap = 'round';
ctx.lineJoin = 'round';
ctx.lineWidth = 10;
ctx.strokeStyle = '#BADA55';

function draw(e) {
    if(!drawing) return;

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();

    [lastX, lastY] = [e.offsetX, e.offsetY];
}

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => drawing = false);
canvas.addEventListener('mouseout', () => drawing = false);

canvas.addEventListener('mousedown', e => {
    drawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});
