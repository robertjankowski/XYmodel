// initialize variable
var GRID_SIZE = 600; // window size
var SIZE_CELL;
var CELL_HEIGHT_WIDTH;
var LINE_GRID_WIDTH = 1;
var LINE_EDGE = 4;
var WHITE = 'rgb(255, 255, 255)';
var BLACK = 'rgb(0, 0, 0)';
var ARROW_COLOR = "rgba(17, 24, 35)";

// cell variables
var cellStates;
var buttonCounter = 0;
var TimeoutID;
var J = 1; // interaction 
var T = 0; // temperature

var color = true; // color on/off
var grid = true; // grid on/off
var arrows = true; // arrows on/off
var fps = 100; // frames per second 

// graphics
var ctx;

window.onload = function xy_model() {

    makeCanvas();
    initCellState(cellStates);
    // attach buttons listeners
    document.getElementById("setup").addEventListener("click", setup);
    document.getElementById("go").addEventListener("click", go);

}

function setup() {
    makeCanvas();
    cellStates = initCellState();
    initRandomCells(cellStates);
    drawCells(cellStates);
    console.log("SETUP");
}

function go() {
    if (buttonCounter % 2 === 0) {
        // for loop simulation
        document.getElementById('setup').disabled = true;
        updateGrid();
    } else {
        // stop simulation
        document.getElementById('setup').disabled = false;
        clearTimeout(TimeoutID);
    }
    buttonCounter++;
}


function initGrid() {
    SIZE_CELL = parseInt(document.getElementById("size_cell").value);
    CELL_HEIGHT_WIDTH = GRID_SIZE / SIZE_CELL;
}

function makeCanvas() {
    canvas = document.getElementById("model");
    canvas.width = GRID_SIZE;
    canvas.height = GRID_SIZE;
    ctx = canvas.getContext('2d');

    initGrid();
    ctx.beginPath();
    ctx.fillStyle = WHITE;
    ctx.fillRect(0, 0, GRID_SIZE, GRID_SIZE);
    makeGrid();
}

function makeGrid() {
    ctx.lineWidth = LINE_GRID_WIDTH;
    ctx.strokeRect(0, 0, GRID_SIZE, GRID_SIZE);
    for (var i = 0; i < CELL_HEIGHT_WIDTH - 1; i++) {
        ctx.beginPath();
        ctx.lineWidth = LINE_GRID_WIDTH;
        ctx.strokeStyle = BLACK;
        ctx.moveTo(SIZE_CELL + i * SIZE_CELL, 0);
        ctx.lineTo(SIZE_CELL + i * SIZE_CELL, GRID_SIZE);
        ctx.stroke();
    }
    for (var j = 0; j < CELL_HEIGHT_WIDTH - 1; j++) {
        ctx.beginPath();
        ctx.lineWidth = LINE_GRID_WIDTH;
        ctx.strokeStyle = BLACK;
        ctx.moveTo(0, SIZE_CELL + j * SIZE_CELL);
        ctx.lineTo(GRID_SIZE, SIZE_CELL + j * SIZE_CELL);
        ctx.stroke();
    }
}


function initCellState() {
    cellStates = [];
    for (var i = 0; i < CELL_HEIGHT_WIDTH; i++) {
        cellStates[i] = [];
        for (var j = 0; j < CELL_HEIGHT_WIDTH; j++) {
            cellStates[i][j] = 0;
        }
    }
    return cellStates;
}

function initRandomCells(cell_state) {
    for (var i = 0; i < CELL_HEIGHT_WIDTH; i++) {
        for (var j = 0; j < CELL_HEIGHT_WIDTH; j++) {
            // range (-pi, pi)
            cell_state[i][j] = Math.PI * (2 * Math.random() - 1);
        }
    }
}

function drawCells(cell_state) {
    var A1 = [];
    var B1 = [];
    for (var i = 0; i < CELL_HEIGHT_WIDTH; i++) {
        for (var j = 0; j < CELL_HEIGHT_WIDTH; j++) {
            var x = i * SIZE_CELL;
            var y = j * SIZE_CELL;

            if (color) {
                ctx.beginPath();
                // map cell value to color
                var red = Math.floor(255 * (Math.cos(cellStates[i][j]) + 1) / 2);
                var green = Math.floor(255 * (Math.sin(cellStates[i][j]) + 1) / 2);
                var blue = Math.floor(255 * (-Math.cos(cellStates[i][j]) + 1) / 2);
                var rgba = "rgba(" + red + "," + green + "," + blue + ",0.75)";
                ctx.fillStyle = rgba;
                ctx.fillRect(x, y, SIZE_CELL, SIZE_CELL);
            }
            if (arrows) {
                ctx.beginPath();
                ctx.strokeStyle = ARROW_COLOR;
                ctx.fillStyle = ARROW_COLOR;
                ctx.lineWidth = 2;
                A1[0] = x + SIZE_CELL / 2 - SIZE_CELL * Math.cos(cellStates[i][j]) / 2.5;
                A1[1] = y + SIZE_CELL / 2 - SIZE_CELL * Math.sin(cellStates[i][j]) / 2.5;
                B1[0] = x + SIZE_CELL / 2 + SIZE_CELL * Math.cos(cellStates[i][j]) / 2.5;
                B1[1] = y + SIZE_CELL / 2 + SIZE_CELL * Math.sin(cellStates[i][j]) / 2.5;
                drawArrow(A1, B1, SIZE_CELL * 0.40, SIZE_CELL * 0.40);
            }
        }
    }

}

function drawArrow(A, B, w, h) {
    // w - width
    // h - height
    var L = [];
    var R = [];
    arrowPos(A, B, w, h, L, R);
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(A[0], A[1]);
    ctx.lineTo(B[0], B[1]);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(L[0], L[1]);
    ctx.lineTo(B[0], B[1]);
    ctx.lineTo(R[0], R[1]);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
}

function arrowPos(A, B, w, h, L, R) {
    var Vx = B[0] - A[0];
    var Vy = B[1] - A[1];
    var v = Math.sqrt(Vx * Vx + Vy * Vy);
    var Ux = Vx / v;
    var Uy = Vy / v;
    L[0] = B[0] - Uy * w - Ux * h;
    L[1] = B[1] + Ux * w - Uy * h;
    R[0] = B[0] + Uy * w - Ux * h;
    R[1] = B[1] - Ux * w - Uy * h;
}

function updateGrid() {
    makeCanvas();
    T = parseFloat(document.getElementById("temp_id").value);
    J = parseFloat(document.getElementById("interaction_id").value);
    for (var i = 0; i < CELL_HEIGHT_WIDTH; i++) {
        for (var j = 0; j < CELL_HEIGHT_WIDTH; j++) {

            // choose random position of spin
            var x = Math.floor(Math.random() * CELL_HEIGHT_WIDTH);
            var y = Math.floor(Math.random() * CELL_HEIGHT_WIDTH);

            var right_x = x - 1;
            var left_x = x + 1;
            var up_y = y - 1;
            var down_y = y + 1;

            // periodic boundary condition
            if (right_x < 0)
                right_x = CELL_HEIGHT_WIDTH - 1;
            if (left_x > CELL_HEIGHT_WIDTH - 1)
                left_x = 0;
            if (up_y < 0)
                up_y = CELL_HEIGHT_WIDTH - 1;
            if (down_y > CELL_HEIGHT_WIDTH - 1)
                down_y = 0;

            var randomSpin = cellStates[x][y] + 0.25 * Math.PI * (2 * Math.random() - 1);
            if (randomSpin >= Math.PI) {
                randomSpin = randomSpin - 2 * Math.PI;
            } else if (randomSpin < -Math.PI) {
                randomSpin = randomSpin + 2 * Math.PI;
            }
            // deltaE = E_new - E
            var deltaE = -J * (Math.cos(randomSpin - cellStates[right_x][y]) +
                    Math.cos(randomSpin - cellStates[left_x][y]) +
                    Math.cos(randomSpin - cellStates[x][up_y]) +
                    Math.cos(randomSpin - cellStates[x][down_y])) +
                J * (Math.cos(cellStates[x][y] - cellStates[right_x][y]) +
                    Math.cos(cellStates[x][y] - cellStates[left_x][y]) +
                    Math.cos(cellStates[x][y] - cellStates[x][up_y]) +
                    Math.cos(cellStates[x][y] - cellStates[x][down_y]));

            var expBoltzmann = 0;
            if (T !== 0) {
                expBoltzmann = Math.exp(-deltaE / T);
            }
            if (deltaE > 0) {
                if (Math.random() < expBoltzmann) {
                    cellStates[x][y] = randomSpin;
                }
            } else {
                cellStates[x][y] = randomSpin;
            }
        }
    }
    drawCells(cellStates);
    if (grid) {
        makeGrid();
    }
    TimeoutID = setTimeout(updateGrid, 1000 / fps, cellStates);
}