$(function () {

    $('.c-blog__list__item').hover(
        function () {
            $(this).addClass('c-blog__list__item--active')
        },
        function () {
            $(this).removeClass('c-blog__list__item--active')
        }
    );

    //offpage menù

    var isLateralNavAnimating = false;
    $('.nav--scroll--mnu, .c-blog__logo--mnu, .mnu-nav--close').on('click', function (e) {
        e.preventDefault();
        if (!isLateralNavAnimating) {
            //if($(this).parents('.csstransitions').length > 0 ) isLateralNavAnimating = true;

            $('body').toggleClass('navigation--open');
            $('.mnu-navigation-wrapper').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
                isLateralNavAnimating = false;
            });
        }
    });


    //Nav on Scroll
    var navOnScroll = $('.nav--scroll');
    var navOnScrollHandler = $('.c-blog__logo').waypoint({
        handler: function (direction) {
            if (direction == 'down')
                $(navOnScroll).addClass('nav--scroll--open');
            if (direction == 'up')
                $(navOnScroll).removeClass('nav--scroll--open');
        },
        offset: '-30%',
        context: $('.mnu-page__content')
    })


    //Reading time total
    $('.fittext').fitText();
    $('.fittext-mid').fitText(1.6, {minFontSize: '32px', maxFontSize: '36px'});

    $.fn.readingtime = function (options) {
        var settings = $.extend({
            wpm: 250,
            round: 'round'
        }, options);
        var words = $(this).text().replace(/\s+/g, ' ').split(' ').length;
        return Math[settings.round](words / settings.wpm);
    };
    $('.nav--scroll__reading-total__content').html($('.c-blog__single p').readingtime());


    $.readingProgress = function (options) {
        var settings = $.extend({
            context: $('.mnu-page__content'),
            startFrom: $('body'),
            progressBarItem: '.nav--scroll__reading-progress__item',
            activeClass: 'nav--scroll__reading-progress__item--active'
        }, options);
        var percentage;
        var getMax = function () {

            return $(settings.context)[0].scrollHeight - $(window).height();
        }

        var getValue = function () {
            return $(window).height() - getStart();
        }

        var getStart = function () {

            return $(settings.startFrom).position().top;
        }

        var setPercentage = function () {
            percentage = (getValue() / getMax()) * 100;
            $(settings.progressBarItem).each(function (i) {
                if (percentage >= ((i + 1) * 10)) {
                    $(this).addClass(settings.activeClass);
                } else if (percentage < ((i + 1) * 10)) {
                    $(this).removeClass(settings.activeClass);
                }
            });
        };
        $(settings.context).on('scroll', function () {
            setPercentage()
        });
        $(settings.context).on('resize', function () {
            setPercentage()
        });
    }

    if($('.c-blog__image--main').length > 0){
        $.readingProgress({
            startFrom: $('.c-blog__image--main')
        });
    }

    $('#post-content img').unwrap('p');
    $('#post-content p, #post-content ol, #post-content ul').wrap('<div class="c-blog__content"></div>');
    $('#post-content img').wrap('<figure class="c-blog__content__img"></figure>');
    $('#post-content p').addClass('c-blog__content__p');
    $('#post-content h4').addClass('c-blog__content__section--title vibrant-alt');
    $('#post-content blockquote').addClass('c-blog__content__bq vibrant');
    $('#post-content a').addClass('vibrant');
    $('.c-blog__subtitle a').addClass('vibrant-alt');

    $('h1.c-blog__title').html($('.c-blog__title').html().split(', ').map(function(el) {return '<span>' + el + ' </span>'}))
    $('h1.c-blog__title span').first().addClass('c-blog__title--bold vibrant');

    //Paragraph on scroll
    $('.c-blog__content__section--title').each(function (i) {
        var text = $(this).text();
        var parHandler = new Waypoint.Inview({
            element: $('.c-blog__content__section--title')[i],
            entered: function (direction) {
                $('.c-blog__subtitle--navbar').html(text);
            },
            context: $('.mnu-page__content')
        });
    });


//Img In in blog article;
    $("figure[class^='c-blog__content__img'] img").each(function (i) {
        $(this).css('opacity', 0);
        var parHandler = new Waypoint.Inview({
            element: $("figure[class^='c-blog__content__img'] img")[i],
            entered: function (direction) {
                $(this.element).addClass('animated fadeIn');
            },
            context: $('.mnu-page__content')
        });
    })

//Colore per la tipografia del blog (single) basta inserire le classi vibrant e vibrant-alt
    if ($('.c-blog__image--main-img').length > 0 || $('.c-blog__list__item--first').length > 0) {
        var vibrantMain = 'Vibrant',
            vibrantAlt = 'DarkVibrant';
        var img = document.createElement('img');
        if ($('.c-blog__image--main-img').length > 0) {
            img.setAttribute('src', $('.c-blog__image--main-img').attr('src'));
            img.addEventListener('load', function () {
                var vibrant = new Vibrant(img);
                var swatches = vibrant.swatches();
                $('.vibrant').css('color', swatches[vibrantMain].getHex())
                $('.vibrant-alt').css('color', swatches[vibrantAlt].getHex())
            });
        } else if ($('.c-blog__list__item--first').length > 0)
        {
            img.setAttribute('src', $('.c-blog__list__item--first').attr('data-img'));
            img.addEventListener('load', function () {
                var vibrant = new Vibrant(img);
                var swatches = vibrant.swatches();
                $('.vibrant').css('color', swatches[vibrantMain] .getTitleTextColor())

            });

        }

    }
//end

//Onscroll greyscale to rgb main image
    if ($('.c-blog__image--main').length > 0) {
        var mainImageOffset = $('.c-blog__image--main').offset().top;
        $('.mnu-page__content').scroll(function () {
            var posTop = $(window).scrollTop() - $('.c-blog__image--main').offset().top;
            var grayscalePercentage = (mainImageOffset + posTop) * 100 / mainImageOffset;
            grayscalePercentage = (grayscalePercentage > 100) ? 100 : grayscalePercentage;
            $('.c-blog__image--main').css('-webkit-filter', 'grayscale(' + (100 - grayscalePercentage) + '%)');
        }).trigger('scroll');
    }

})
;