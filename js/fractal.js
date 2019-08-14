const canvas = document.getElementById("renderCanvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext("2d");
context.strokeStyle = "#DDDDDD";

const gears = (center, radius, pieces, angle, limit) => {

    const slice = 2 * Math.PI / pieces;

    if (limit <= 0) return;
    let currentRadius = radius;
    let distance = radius;
    for (let i = limit; i > 1; --i) {
        currentRadius /= 1.7;
        distance += currentRadius * (1 << (limit - i));
    }

    context.beginPath();
    context.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    context.stroke();

    for (let i = 0; i < pieces; ++i) {
        const pieceAngle = angle + slice * i;
        const pieceCenter = {
            x: center.x + distance * Math.cos(pieceAngle),
            y: center.y + distance * Math.sin(pieceAngle)
        };
        gears(pieceCenter, radius / 1.7, pieces, pieceAngle, limit - 1);
    }
}

let rotation = 0;
let radius = 0;

const FINAL_RADIUS = 45;
const FINAL_ROTATION = ((35 + Math.random() * 90) / 180) * Math.PI;

const FRACTAL_X = canvas.width / 4 + Math.random() * (canvas.width / 2);
const FRACTAL_Y = canvas.height / 4 + Math.random() * (canvas.height / 2);

const NUM_GEARS = Math.round(3 + Math.random());

const animation = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);

    radius += (FINAL_RADIUS - radius) / 5.0;
    rotation += (FINAL_ROTATION - rotation) / 5.0;
    gears({x: FRACTAL_X, y: FRACTAL_Y}, radius, NUM_GEARS, rotation, 5);

    if (radius < FINAL_RADIUS - 0.5 || rotation < FINAL_ROTATION - 0.5)
        window.requestAnimationFrame(animation);
}

setTimeout(() => { window.requestAnimationFrame(animation); }, 350);

