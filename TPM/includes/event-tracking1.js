(function($) {
    return $.fn.uaEvents = function(options) {
        var log, settings;
        log = function(message) {
            if (typeof console === "object") {
                return console.log(message);
            }
        };
        settings = $.extend({
            selector: ".track",
            default_category: "General"
        }, options);
        if (typeof ga !== "function") {
            log("Google Analytics (analytics.js) was not initialized.");
            return false;
        }
        return $(this).each(function() {
            var bindEvents, trackEvent, _self;
            bindEvents = function() {
                _self.find(settings.selector).on("click", function(e) {
                    return trackEvent("click", $(this));
                });
                _self.find(settings.selector + "-blur").on("blur", function(e) {
                    return trackEvent("blur", $(this));
                });
                _self.find(settings.selector + "-complete").on("blur", function(e) {
                    if ($.trim($(this).val()) !== "") {
                        return trackEvent("complete", $(this));
                    }
                });
                _self.find(settings.selector + "-focus").on("focus", function(e) {
                    return trackEvent("focus", $(this));
                });
                _self.find(settings.selector + "-mouseover").on("mouseover", function(e) {
                    return trackEvent("mouseover", $(this));
                });
                return _self.find(settings.selector + "-change").on("change", function(e) {
                    return trackEvent("change", $(this));
                });
            };
            trackEvent = function(event_type, element) {
                var action, category, label, value;
                category = element.data("category") || settings.default_category;
                action = element.data("action") || interaction;
                label = element.data("label") || "";
                value = element.data("value") || 1;
                return ga("send", "event", category, action, label, value);
            };
            _self = $(this);
            return bindEvents();
        });
    };
})(jQuery);

 
