// colors
var BLACK_COLOR = 0x000000;
var WHITE_COLOR = 0xffffff;
var EDGE_COLOR = 0x2679ff; // blue
var GRID_COLOR = 0xa1aab7; // gray

// initialize variable
const GRID_SIZE = 600;
var SIZE_CELL;
var CELL_HEIGHT_WIDTH;
var LINE_GRID_WIDTH = 1;
var LINE_EDGE = 2;

//
var total_cells;
var go_button_counter = 1;

// pixi.js variables
var view;
var rendered;
var stage;
var graphics;

function init_grid() {
    SIZE_CELL = parseInt(document.getElementById("size_cell").value);
    CELL_HEIGHT_WIDTH = GRID_SIZE / SIZE_CELL;
    total_cells = CELL_HEIGHT_WIDTH * CELL_HEIGHT_WIDTH;
}

function make_grid() {
    graphics.lineStyle(LINE_EDGE, BLACK_COLOR);
    graphics.drawRect(0, 0, GRID_SIZE, GRID_SIZE);
    for (var i = 0; i < CELL_HEIGHT_WIDTH - 1; i++) {
        graphics.lineStyle(LINE_GRID_WIDTH, GRID_COLOR);
        // from https://stackoverflow.com/a/7531540/9511702
        graphics.moveTo(SIZE_CELL + i * SIZE_CELL + 0.5, 0);
        graphics.lineTo(SIZE_CELL + i * SIZE_CELL + 0.5, GRID_SIZE);
        graphics.closePath();
    }
    for (var j = 0; j < CELL_HEIGHT_WIDTH - 1; j++) {
        graphics.lineStyle(LINE_GRID_WIDTH, GRID_COLOR);
        graphics.moveTo(0, SIZE_CELL + j * SIZE_CELL + 0.5);
        graphics.lineTo(GRID_SIZE, SIZE_CELL + j * SIZE_CELL + 0.5);
        graphics.closePath();
    }
    console.log("END");
}

function create_canvas() {
    view = document.getElementById("model");
    rendered = PIXI.autoDetectRenderer(GRID_SIZE, GRID_SIZE, {
        view: view
    });
    stage = new PIXI.Container();
    // draw grid
    init_grid();
    graphics = new PIXI.Graphics();
    graphics.beginFill(WHITE_COLOR);
    graphics.drawRect(0, 0, GRID_SIZE, GRID_SIZE);
    graphics.endFill();
    make_grid();
    stage.addChild(graphics);
    rendered.render(stage);
}

function setup() {
    create_canvas();
    console.log("SETUP");
}

function go() {
    if (go_button_counter % 2 === 0) {
        // forever loop simulation
        document.getElementById("setup").disabled = false;
        // TODO: create update function only with colors !!!
    }
    else {
        // stop simulation
        document.getElementById("setup").disabled = true;
    }
    go_button_counter++;
}

window.onload = function () {

    create_canvas();

    // attach buttons listeners
    document.getElementById("setup").addEventListener("click", setup);
    document.getElementById("go").addEventListener("click", go);

}


/*
var temperature = document.getElementById("temp_id").value;
console.log(temperature);
*/