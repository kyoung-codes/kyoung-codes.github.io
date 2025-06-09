// JavaScript Document


// gnb 슬라이드
$(function () {
    $('#gnb').on('mouseenter', function () {
        $('#header').addClass('open');
    })

    $('#gnb').on('mouseleave', function () {
        $('#header').removeClass('open');
        if($('#header').hasClass('open')) {
            return false;
        } else {
            $('#header').removeClass('open');
        }
    })
})


// fade 효과
$(window).on('scroll', function () {
    const $fadeLeft = $('.fade-left');
    const $fadeBottom = $('.fade-bottom');
    const $fadeRight = $('.fade-right');

    $fadeLeft.each(function () {
        const top = $(this).offset().top;
        const scroll = $(window).scrollTop();
        const windowHeight = $(window).height();

        if (scroll + windowHeight > top + 100) {
            $(this).addClass('visible');
        }
    });

    $fadeBottom.each(function () {
        const top = $(this).offset().top;
        const scroll = $(window).scrollTop();
        const windowHeight = $(window).height();

        if (scroll + windowHeight > top + 100) {
            $(this).addClass('visible');
        }
    });
    
    $fadeRight.each(function () {
        const top = $(this).offset().top;
        const scroll = $(window).scrollTop();
        const windowHeight = $(window).height();

        if (scroll + windowHeight > top + 100) {
            $(this).addClass('visible');
        }
    });    
});