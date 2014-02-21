/*
 *  Analytics Event Tracking With jQuery
 * 
 * Usage Command Line: $('body').uaEvents() 
 * @requires jQuery 1.7+
 */

(function ($) {
    $.fn.uaEvents = function (options) {
        var settings = $.extend({
            selector: '.track',
            default_category: 'General'
        }, options);

        if (typeof ga !== 'function') {
            log('Google Analytics (analytics.js) was not initialized.');
            return false;
        }

        return $(this).each(function () {
            var _self = $(this);

            bindEvents();

            function bindEvents() {
                _self.find(settings.selector).on('click', function (e) {
                    trackEvent('click', $(this));
                });

                _self.find(settings.selector + '-blur').on('blur', function (e) {
                    trackEvent('blur', $(this));
                });

                _self.find(settings.selector + '-complete').on('blur', function (e) {
                    if ($.trim($(this).val()) != '') {
                        trackEvent('complete', $(this));
                    }
                });

                _self.find(settings.selector + '-focus').on('focus', function (e) {
                    trackEvent('focus', $(this));
                });

                _self.find(settings.selector + '-mouseover').on('mouseover', function (e) {
                    trackEvent('mouseover', $(this));
                });

                _self.find(settings.selector + '-change').on('change', function (e) {
                    trackEvent('change', $(this));
                });
            };

            function trackEvent(event_type, element) {
                var category = element.data('category') || settings.default_category;
                var action = element.data('action') || interaction;
                var label = element.data('label') || ''; // optional
                var value = element.data('value') || 1; // optional

                ga('send', 'event', category, action, label, value);
            }
        });

        function log(message) {
            if (typeof console === 'object') {
                console.log(message);
            }
        }
    }
}(jQuery));