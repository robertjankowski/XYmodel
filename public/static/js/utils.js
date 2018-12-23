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
