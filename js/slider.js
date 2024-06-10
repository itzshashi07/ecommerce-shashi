// brands
var owl = $('#brands');
owl.owlCarousel({
    items: 9,
    loop: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 1000,
    autoplayHoverPause: true,
    responsiveClass: true,
    responsive: {
        0: {
            items: 3,
            nav: false
        },
        530: {
            items: 5,
        },
        700: {
            items: 6,
            nav: false,
            loop: true,
        },
        1000: {
            items: 8,
            nav: false,
            loop: true,
        },
        1200: {
            items: 9,
            nav: false,
            loop: false
        }
    }
});
$('.play').on('click', function () {
    owl.trigger('play.owl.autoplay', [1000])
})
$('.stop').on('click', function () {
    owl.trigger('stop.owl.autoplay')
})





// for main banner slider in hro section

var owl = $('#banner-slider');
owl.owlCarousel({
    items: 1,
    loop: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    dots: true,
    responsiveClass: true,

});
$('.play').on('click', function () {
    owl.trigger('play.owl.autoplay', [1000])
})
$('.stop').on('click', function () {
    owl.trigger('stop.owl.autoplay')
})


// most viewed

var owl = $('#most-viewed');
owl.owlCarousel({
    items: 4,
    loop: true,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    dots: false,
    responsiveClass: true,
    responsive: {
        0: {
            items: 1,
            nav: false
        },
        430: {
            items: 2,
        },
        767: {
            items: 3,
            nav: false,
            loop: true,
        },
        1000: {
            items: 4,
            nav: false,
            loop: true,
        },
        1200: {
            items: 4,
            nav: false,
            loop: true
        }
    }

});

$('.play').on('click', function () {
    owl.trigger('play.owl.autoplay', [1000])
})
$('.stop').on('click', function () {
    owl.trigger('stop.owl.autoplay')
})

