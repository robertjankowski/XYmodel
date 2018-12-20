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
var cell_state;
var go_button_counter = 0;
var timeout;

// pixi.js variables
var view;
var rendered;
var stage;
var graphics;
var ticker;

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
}

function create_canvas() {
    view = document.getElementById("model");
    rendered = PIXI.autoDetectRenderer(GRID_SIZE, GRID_SIZE, {
        view: view
    });
    stage = new PIXI.Container();
    ticker = new PIXI.ticker.Ticker()
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
    init_cells_state();
    random_init_cells();
    draw_cells();
    rendered.render(stage);
    ticker.add((deltaTime) => {
        update(); // TODO: not rendering updated cell_state! 
        rendered.render(stage);
    });
    console.log("SETUP");
}

function go() {
    if (go_button_counter % 2 === 0) {
        // forever loop simulation
        document.getElementById("setup").disabled = true;
        ticker.start();

    } else {
        // stop simulation
        document.getElementById("setup").disabled = false;
        ticker.stop();
    }
    go_button_counter++;
}


function update() {
    var T = parseFloat(document.getElementById("temp_id").value);
    var J = parseFloat(document.getElementById("interaction_id").value);

    const fps = 50;

    for (var i = 0; i < CELL_HEIGHT_WIDTH; i++) {
        for (var j = 0; j < CELL_HEIGHT_WIDTH; j++) {

            // TODO: implement Metropolis algorithm
            var delta_E = 0;

            var exp_boltzmann = 0;
            if (T != 0) {
                exp_boltzmann = Math.exp(-delta_E / T);
            }

        }
    }
    // for tests
    random_init_cells();
}

function draw_cells() {
    // for arrows
    var A1 = new Array(2);
    var B1 = new Array(2);
    var A2 = new Array(2);
    var B2 = new Array(2);
    for (var i = 0; i < CELL_HEIGHT_WIDTH; i++) {
        for (var j = 0; j < CELL_HEIGHT_WIDTH; j++) {
            var xx = i * SIZE_CELL;
            var yy = j * SIZE_CELL;

            // map angle to color
            var red = Math.floor(
                255 * (Math.cos(cell_state[i][j]) + 1) / 2
            );
            var green = Math.floor(
                255 * (Math.sin(cell_state[i][j]) + 1) / 2
            );
            var blue = Math.floor(
                255 * (-Math.cos(cell_state[i][j]) + 1) / 2
            );
            var alpha = 0.75;
            var color = "rgba(" + red + "," + green + "," + blue + "," + alpha + ")";
            var hex = rgb2hex(color);
            var hexInt = '0x' + hex.replace(/^#/, '');
                
            graphics.beginFill(hexInt);
            graphics.drawRect(xx, yy, SIZE_CELL, SIZE_CELL);
            graphics.endFill();
            
        }
    }
}

function init_cells_state() {
    cell_state = new Array();
    for (var i = 0; i < CELL_HEIGHT_WIDTH; i++) {
        cell_state[i] = new Array();
        for (var j = 0; j < CELL_HEIGHT_WIDTH; j++) {
            cell_state[i][j] = 0;
        }
    }
}

function random_init_cells() {
    for (var i = 0; i < CELL_HEIGHT_WIDTH; i++) {
        for (var j = 0; j < CELL_HEIGHT_WIDTH; j++) {
            // range (-pi, pi)
            cell_state[i][j] = Math.PI * (2 * Math.random() - 1); 
        }
    }
}

window.onload = function xy_model() {

    create_canvas();
    init_cells_state();

    // attach buttons listeners
    document.getElementById("setup").addEventListener("click", setup);
    document.getElementById("go").addEventListener("click", go);

}
