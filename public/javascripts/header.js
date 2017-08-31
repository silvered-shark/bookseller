define(['header', 'jQuery'], function (header, $) {

    var init = function(){
        $(document).ready(function() {

            $('#home').height($(window).height())
            $(window).on('resize', function() {

                $('#home').height($(window).height());
            });



            $('.smoothscroll').on('click',function (e) {
                e.preventDefault();

                var target = this.hash,
                    $target = $(target);

                $('html, body').stop().animate({
                    scrollTop: $target.offset().top
                }, 800, 'swing', function () {
                    window.location.hash = target;
                });
            });

        });

    };
    var secondInit = function(){
    };

    return {
        init:init,
        secondInit:secondInit
    };
});