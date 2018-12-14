var view = document.getElementById("model")
var rendered = PIXI.autoDetectRenderer(400, 400, {view});
var stage = new PIXI.Container();



function render() {
    rendered.render(stage);
}
