/**
 * Created by sachin on 27/7/17.
 */
define(['_utils','jquery'], function (_utils, $) {

    var utilityFunc = {

        fixUrl: function (url) {

            if ( !url ) {
                return '';
            }

            if ( url.indexOf('/') !== 0 ) {
                url = '/' + url;
            }

            return url;
        },
        requestHTML: function (url) {

            if ( !url ) {
                return "";
            }

            url = '/gethtml' + url

            if ( url.indexOf('?') > -1) {
                url += '&html=true';
            }else {
                url += '?html=true';
            }

            return url;
        },

        _bindScroll: function (callback, elm) {

            var bodyFlag = (elm === window || elm === document.body),
                raw = bodyFlag ? document.body : elm,
                threshold = Math.floor(raw.scrollHeight * 0.4),
                scrollElement = bodyFlag ? $(window) : $(elm);

            if (bodyFlag) {
                threshold *= 2.20;
                var scrollTop;
                scrollElement.bind('scroll.global', this.debounce(function() {
                    scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
                    if (scrollTop + scrollElement.height() >= raw.scrollHeight - threshold) {
                        callback();
                    }
                }, 25, true));
            }
            else {
                scrollElement.bind('scroll.global', this.debounce(function() {
                    if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight - threshold) {
                        callback();
                    }
                }, 25, true));
            }
        },
        _unbindScroll: function(elm) {

            var bodyFlag = (elm === window || elm === document.body),
                raw = bodyFlag ? document.body : elm,
                scrollElement = bodyFlag ? $(window) : $(elm);
            scrollElement.unbind('scroll.global');

        },
        debounce: function (func, wait, immediate) {

            var timeout;
            return function() {
                var context = this, args = arguments;
                var later = function() {
                    timeout = null;
                    if (!immediate) func.apply(context, args);
                };
                var callNow = immediate && !timeout;
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
                if (callNow) func.apply(context, args);
            };

        },

        throttle: function (func, limit) {

            var inThrottle,
                lastFunc,
                throttleTimer;

            return function() {
                var context = this,
                    args = arguments;
                if (inThrottle) {
                    clearTimeout(lastFunc);
                    return lastFunc = setTimeout(function() {
                        func.apply(context, args);
                        inThrottle = false;
                    }, limit);
                } else {
                    func.apply(context, args);
                    inThrottle = true;
                    return throttleTimer = setTimeout(function() {
                        return inThrottle = false;
                    }, limit);
                }
            };

        },
    };

    return utilityFunc;

});