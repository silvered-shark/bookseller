/**
 * Created by sachin on 29/7/17.
 */
define(['index', 'jQuery'], function (index, $) {

    var init = function(){

        $('.carousel').carousel({
            interval: 3000 //changes the speed
        });
    console.log("INdex page js run...");
    };
    var secondInit = function(){
    };

    return {
        init:init,
        secondInit:secondInit
    };
});