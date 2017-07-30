define(['header', 'jQuery'], function (header, $) {

    var init = function(){
        $(document).ready(function(){
            $('.dropdown-submenu a.test').on("click", function(e){
                $(this).next('ul').toggle();
                e.stopPropagation();
                e.preventDefault();
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