define("header",["header","jQuery"],function(n,e){var t=function(){e(document).ready(function(){e(".dropdown-submenu a.test").on("click",function(n){e(this).next("ul").toggle(),n.stopPropagation(),n.preventDefault()})})},o=function(){};return{init:t,secondInit:o}});