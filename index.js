(function () {
    var cache = {};

    function parse(string) {
        var wrapper = document.createElement('div');
        wrapper.innerHTML = string;
        return wrapper.firstChild;
    }

    function readEventHandlers(root, eventHandler) {
        handleNode(root, eventHandler);
        Array.prototype.slice.call(root.querySelectorAll("*")).forEach(function (node) {
            handleNode(node, eventHandler);
        });
    }

    function handleNode(node, eventHandler) {
        for (eventHandlerAttribute in node) {
            //filter attribute to get eventhandler attributes
            if (eventHandlerAttribute.indexOf('on') === 0) {
                //if a template is used as event handler
                if (node.getAttribute(eventHandlerAttribute) && /^{.*}$/.test(node.getAttribute(eventHandlerAttribute))) {
                    registerEventHandler(node, eventHandlerAttribute, eventHandler)
                }
            }
        }
    }

    function registerEventHandler(element, event, eventHandler) {
        var cacheKey = Math.random().toString(36).substring(7);
        cache[cacheKey] = {};
        cache[cacheKey][event.substring(2)] = eventHandler[getFnName(element.getAttribute(event))];
        element[event] = function (event) {
            return cache[cacheKey][event.type](event);
        }
    }

    function getFnName(template) {
        return template.substring(1, template.indexOf("("));
    }

    function tomplate(string, eventHandler) {
        var element = parse(string);
        if (eventHandler) {
            readEventHandlers(element, eventHandler);
        }
        return element;
    }

    window.tomplate = tomplate;
    if (module) {
        module.exports = tomplate;
    }
})();