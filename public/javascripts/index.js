/**
 * Created by sachin on 29/7/17.
 */
define(['index', 'jQuery'], function (index, $) {

    var init = function(){

        $('.carousel').carousel({
            interval: 3000 //changes the speed
        });

        $('#section-1').addClass('animated-delay:1s');
        $('#section-2').addClass('animated-delay:5s');
    };
    var secondInit = function(){
    };

    return {
        init:init,
        secondInit:secondInit
    };
});