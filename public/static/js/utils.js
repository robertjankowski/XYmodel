// Temperature slider setup
$(".temperature").ionRangeSlider({
    min: 0,
    max: 2,
    step: 0.05,
    from: 1.5,
    skin: 'round',
    onChange: function (data) {
        console.log(data.from);
    }
});

// Grid size slider setup
$(".grid").ionRangeSlider({
    min: 32,
    max: 256,
    step: 8,
    from: 128,
    skin: 'round',
    onChange: function(data) {
        console.log(data.from);
    }
});
