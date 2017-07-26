// This file will contain the elements essential to all pages of our site

require.config({
    waitSeconds: 200,
    paths: {
        'jQuery': 'jquery.min',
        'bootstrap': 'bootstrap.min',
        'jqBootstrapValidation':'jqBootstrapValidation',
        'fblogin':'fblogin',
        '_utils':'_utils'
    },
    shim: {
        jQuery: {
            exports: '$'
        },
        "bootstrap" : { "deps" :['jQuery'] },
        jqBootstrapValidation : { "deps" :['jQuery'] },
        "fblogin":{"deps":['jquery']},
        "like":{"deps":['jquery']},
    }
});

require(['jQuery','bootstrap','indexPage','contactPage','jqBootstrapValidation','fblogin','like'], function($,logout) {
    "use strict";
    logout.init();
    // console.log('App loaded with jQuery & bootstrap');
});