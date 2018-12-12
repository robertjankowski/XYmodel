var view = document.getElementById("model")
var rendered = PIXI.autoDetectRenderer(400, 400, {view});
var stage = new PIXI.Container();

const arrowImagePath = "../images/arrow.png"
PIXI.loader
    .add(arrowImagePath)
    .load(render)

// let img = new PIXI.Sprite(PIXI.loader.resources[arrowPath].texture)
// var spin = new Spin(0,0,0);


function render() {
    rendered.render(stage);
}
