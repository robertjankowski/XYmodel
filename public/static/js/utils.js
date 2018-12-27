// sliders
// temperature slider setup
var $temperature_slider = $(".temperature");
$temperature_slider.ionRangeSlider({
    min: 0,
    max: 10,
    step: 0.05,
    from: 2,
    skin: 'round'
});

// interaction slider setup
var $interaction_slider = $(".interaction");
$interaction_slider.ionRangeSlider({
    min: -5,
    max: 5,
    step: 0.5,
    from: 1,
    skin: 'round'
})

// fps slider setup
var $fps_slider = $(".fps");
$fps_slider.ionRangeSlider({
    min: 1,
    max: 100,
    step: 1,
    from: 60,
    skin: 'round',
    onChange: function (data) {
        fps = data.from;
    }
});

// switches
// color on/off
var $color = $(".color");
$color.bootstrapToggle();
$color.change(function () {
    color = $(".color").prop('checked');
});

// grid on/off
var $grid = $(".grid");
$grid.bootstrapToggle();
$grid.change(function () {
    grid = $(".grid").prop('checked');
});

// arrows on/off
var $arrows = $(".arrows");
$arrows.bootstrapToggle();
$arrows.change(function () {
    arrows = $(".arrows").prop("checked");
});

// save data to .txt
function download(content, filename) {
    var file = new File([content], filename + ".txt", {
        type: "text/plain;charset=utf-8"
    });
    saveAs(file);
}