// This file will contain the elements essential to all pages of our site

require.config({
    waitSeconds: 200,
    paths: {
        'jQuery': 'jquery.min',
        'bootstrap': 'bootstrap.min',
        'jqBootstrapValidation':'jqBootstrapValidation',
        '_utils':'_utils'
    },
    shim: {
        jQuery: {
            exports: '$'
        },
        "bootstrap" : { "deps" :['jQuery'] },
        jqBootstrapValidation : { "deps" :['jQuery'] }
    }
});

require(['jQuery','bootstrap','jqBootstrapValidation'], function($,logout) {
    "use strict";
    logout.init();
    // console.log('App loaded with jQuery & bootstrap');
});