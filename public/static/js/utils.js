// temperature slider setup
var $temperature_slider = $(".temperature");
$temperature_slider.ionRangeSlider({
    min: 0,
    max: 10,
    step: 0.1,
    from: 2,
    skin: 'round'
});

// interaction slider setup
var $interaction_slider = $(".interaction");
$interaction_slider.ionRangeSlider({
    min: -5,
    max: 5,
    step: 1,
    from: 1,
    skin: 'round'
})

// convert hex format to a rgb color
// from https://jsfiddle.net/Mottie/xcqpF/1/light/
function rgb2hex(rgb) {
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? "#" +
        ("0" + parseInt(rgb[1], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2], 10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3], 10).toString(16)).slice(-2) : '';
}