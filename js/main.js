$(function()
{
    ymaps.ready(init);


    var $nav = $('#nav'),
        navtop  = 180,
        $navEmpty = $('#nav-empty');
    $navEmpty.height($nav.height());

    $(window).on('scroll',function (e) {

        if (navtop < $(window).scrollTop()) {
            $nav.addClass('fly').css({'marginLeft': -($nav.width() / 2)});
            $navEmpty.show();
        }
        else {
            $nav.removeClass('fly').css({marginLeft: 0});
            $navEmpty.hide();
        }

        var name = '';
        $('.anchor').each(function () {
            if ($(this).offset().top - 150 < $(window).scrollTop()) {
                name = $(this).attr('id');
            }
        })
        $('#nav a').parent().removeClass('active');
        var $a = $('#nav a[href*="' + name + '"]');
        if ($a.length)
            $a.parent().addClass('active');
        else
            $('#nav a:first').parent().addClass('active');
    }).scroll();

    $(document).on('click', '#nav li', function (e) {

        e.preventDefault();
        e.stopPropagation();
        var hash = $(this).children('a').attr('href');
        $.scrollTo($('.anchor.' + hash.slice(1)).offset().top - 60, 500, {onAfter: function () {
            //window.location.hash = hash;
        }});

        return false;
    });





    function init () {
        myMap = new ymaps.Map ("map", {
            center: [45.048533, 38.985032],
            zoom: 14
        });
        myMap.controls.destroy();


        myPlacemark = new ymaps.Placemark([45.046852, 38.983603], {
            hintContent: '',
            balloonContent: ''
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: '/img/map_pin.png',
            // Размеры метки.
            iconImageSize: [28, 33],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-13, -33]
        });
        myMap.geoObjects.add(myPlacemark);

    }
});

