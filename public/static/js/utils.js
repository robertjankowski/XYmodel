// Temperature slider setup


// Grid size slider setup

// Test $ is not a function ...
// $("#example-id").ionRangeSlider({
    // min: 0,
    // max: 2,
    // from: 1
// });

var $jq = jQuery.noConflict();
$jq("#example-id").ionRangeSlider({
    min: 0,
    max: 100,
    from: 20
});