// Temperature slider setup
var $temperature_slider = $(".temperature");
$temperature_slider.ionRangeSlider({
    min: 0,
    max: 2,
    step: 0.05,
    from: 1.5,
    skin: 'round'
});