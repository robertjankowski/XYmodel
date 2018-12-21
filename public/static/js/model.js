// initialize variable
var GRID_SIZE = 600; // window size
var SIZE_CELL;
var CELL_HEIGHT_WIDTH;
var LINE_GRID_WIDTH = 1;
var LINE_EDGE = 4;
var WHITE = 'rgb(255, 255, 255)';
var BLACK = 'rgb(0, 0, 0)';

// cell variables
var total_cells;
var cellStates;
var buttonCounter = 0;
var TimeoutID;

// graphics
var context;

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
    context = canvas.getContext('2d');

    initGrid();
    context.beginPath();
    context.fillStyle = WHITE;
    context.fillRect(0, 0, GRID_SIZE, GRID_SIZE);
    makeGrid();
}

function makeGrid() {
    context.lineWidth = LINE_GRID_WIDTH;
    context.strokeRect(0, 0, GRID_SIZE, GRID_SIZE);
    for (var i = 0; i < CELL_HEIGHT_WIDTH - 1; i++) {
        context.beginPath();
        context.lineWidth = LINE_GRID_WIDTH;
        context.strokeStyle = BLACK;
        context.moveTo(SIZE_CELL + i * SIZE_CELL, 0);
        context.lineTo(SIZE_CELL + i * SIZE_CELL, GRID_SIZE);
        context.stroke();
    }
    for (var j = 0; j < CELL_HEIGHT_WIDTH - 1; j++) {
        context.beginPath();
        context.lineWidth = LINE_GRID_WIDTH;
        context.strokeStyle = BLACK;
        context.moveTo(0, SIZE_CELL + j * SIZE_CELL);
        context.lineTo(GRID_SIZE, SIZE_CELL + j * SIZE_CELL);
        context.stroke();
    }
    console.log("MAKE_GRID");
}


function initCellState() {
    cellStates = new Array();
    for (var i = 0; i < CELL_HEIGHT_WIDTH; i++) {
        cellStates[i] = new Array();
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
    for (var i = 0; i < CELL_HEIGHT_WIDTH; i++) {
        for (var j = 0; j < CELL_HEIGHT_WIDTH; j++) {
            var x = i * SIZE_CELL;
            var y = j * SIZE_CELL;

            context.beginPath();
            // map cell value to color
            var red = Math.floor(255 * (Math.cos(cellStates[i][j]) + 1) / 2);
            var green = Math.floor(255 * (Math.sin(cellStates[i][j]) + 1) / 2);
            var blue = Math.floor(255 * (-Math.cos(cellStates[i][j]) + 1) / 2);
            var rgba = "rgba(" + red + "," + green + "," + blue + ",0.75)";
            context.fillStyle = rgba;
            context.fillRect(x, y, SIZE_CELL, SIZE_CELL);
        }
    }
}

var miiin;
var piiin;
var jjin;
var mjjin;
var pjjin;

function updateGrid() {
    var T = parseFloat(document.getElementById("temp_id").value);
    var J = parseFloat(document.getElementById("interaction_id").value);

    // TODO: add arrows and think about algorithms
    
    for (var i = 0; i < CELL_HEIGHT_WIDTH; i++) {
        for (var j = 0; j < CELL_HEIGHT_WIDTH; j++) {

            var ii = Math.floor(Math.random() * CELL_HEIGHT_WIDTH);
            var jj = Math.floor(Math.random() * CELL_HEIGHT_WIDTH);

            var iiin = i;
            miiin = i - 1;
            piiin = i + 1;
            jjin = j;
            mjjin = j - 1;
            pjjin = j + 1;

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
            if (T != 0) {
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

    var fps = 100;
    TimeoutID = setTimeout(updateGrid, 1000 / fps, cellStates); //1000ms
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