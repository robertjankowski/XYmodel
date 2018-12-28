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
var total_cells;
var cellStates;
var buttonCounter = 0;
var TimeoutID;
var J = 1; // interaction 
var T = 0; // temperature

var content = [];

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
    total_cells = CELL_HEIGHT_WIDTH * CELL_HEIGHT_WIDTH;
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
    var A1 = new Array(2);
    var B1 = new Array(2);
    var A2 = new Array(2);
    var B2 = new Array(2);
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
    var L = new Array(2);
    var R = new Array(2);
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

var miiin;
var piiin;
var jjin;
var mjjin;
var pjjin;

function updateGrid() {
    makeCanvas();
    T = parseFloat(document.getElementById("temp_id").value);
    J = parseFloat(document.getElementById("interaction_id").value);

    for (var i = 0; i < CELL_HEIGHT_WIDTH; i++) {
        for (var j = 0; j < CELL_HEIGHT_WIDTH; j++) {

            var ii = Math.floor(Math.random() * CELL_HEIGHT_WIDTH);
            var jj = Math.floor(Math.random() * CELL_HEIGHT_WIDTH);

            var iiin = ii;
            miiin = ii - 1;
            piiin = ii + 1;
            jjin = jj;
            mjjin = jj - 1;
            pjjin = jj + 1;

            boundaryConditions();

            var mii = miiin;
            var pii = piiin;
            var mjj = mjjin;
            var pjj = pjjin;

            var trialCellState = cellStates[ii][jj] + 0.25 * Math.PI * (2 * Math.random() - 1);
            if (trialCellState >= Math.PI) {
                trialCellState = trialCellState - 2 * Math.PI;
            } else if (trialCellState < -Math.PI) {
                trialCellState = trialCellState + 2 * Math.PI;
            }

            var deltaE = -J * (Math.cos(trialCellState - cellStates[mii][jj]) +
                    Math.cos(trialCellState - cellStates[pii][jj]) +
                    Math.cos(trialCellState - cellStates[ii][mjj]) +
                    Math.cos(trialCellState - cellStates[ii][pjj])) +
                J * (Math.cos(cellStates[ii][jj] - cellStates[mii][jj]) +
                    Math.cos(cellStates[ii][jj] - cellStates[pii][jj]) +
                    Math.cos(cellStates[ii][jj] - cellStates[ii][mjj]) +
                    Math.cos(cellStates[ii][jj] - cellStates[ii][pjj]))

            var expBoltzmann = 0;
            if (T !== 0) {
                expBoltzmann = Math.exp(-deltaE / T);
            }
            if (deltaE > 0) {
                if (Math.random() < expBoltzmann) {
                    cellStates[ii][jj] = trialCellState;
                }
            } else {
                cellStates[ii][jj] = trialCellState;
            }
        }
    }
    drawCells(cellStates);
    if (grid) {
        makeGrid();
    }

    // For plotting 
    /*
    M = calculateM(cellStates);
    content.push(T);
    content.push("\t");
    content.push(M);
    content.push("\r\n");
    // T = (0, 5)
    if (T > 2) {
        download(content.join(""), "T_M-test");
        T = 0;
        content = []
    } 
    T += 0.005;
    */
    TimeoutID = setTimeout(updateGrid, 1000 / fps, cellStates);
}

function calculateM(cellStates) {
    var CELL_TOT = CELL_HEIGHT_WIDTH * CELL_HEIGHT_WIDTH;
    var M_x = 0;
    var M_y = 0;
    var Etot = 0;
    for (var ii = 0; ii < CELL_HEIGHT_WIDTH; ii++) {
        for (var jj = 0; jj < CELL_HEIGHT_WIDTH; jj++) {
            mii = ii - 1
            mjj = jj - 1
            if (mii < 0) mii = CELL_HEIGHT_WIDTH - 1;
            if (mjj < 0) mjj = CELL_HEIGHT_WIDTH - 1;
            M_x += Math.cos(-cellStates[ii][jj]) / CELL_TOT;
            M_y += Math.sin(-cellStates[ii][jj]) / CELL_TOT;
            Etot -= J * (Math.cos(cellStates[ii][jj] - cellStates[mii][jj]) +
                    Math.cos(cellStates[ii][jj] - cellStates[ii][mjj])) *
                    Math.pow(CELL_TOT, -1);
        }
    }
    // TODO: sth wrong should be M=1 at T=0 but it is 0 - very weird !
    var M = Math.sqrt(Math.pow(M_x, 2) + Math.pow(M_y, 2))
    console.log("M_x: ", M_x, "\tM_y: ", M_y);
    console.log("M: ", M);
    return M
}

function calculateHelicityModulus(cellStates) {
    // https://arxiv.org/pdf/cond-mat/0304226.pdf

    // TODO: implement helicity modulus
}


function boundaryConditions() {
    var mii = miiin;
    var pii = piiin;
    var mjj = mjjin;
    var pjj = pjjin;

    //periodic boundary condition
    if (mii < 0) mii = mii + CELL_HEIGHT_WIDTH;
    if (pii > CELL_HEIGHT_WIDTH - 1) pii = pii - CELL_HEIGHT_WIDTH;
    if (mjj < 0) mjj = mjj + CELL_HEIGHT_WIDTH;
    if (pjj > CELL_HEIGHT_WIDTH - 1) pjj = pjj - CELL_HEIGHT_WIDTH;

    miiin = mii;
    piiin = pii;
    mjjin = mjj;
    pjjin = pjj;
}