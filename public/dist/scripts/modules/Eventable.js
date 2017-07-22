(function () {

    /**
     * @constructor
     */
    function EventableConstructor() {
    }

    let eventablePrototype = EventableConstructor.prototype;

    eventablePrototype._initEventable = function () {
        this._eventable_registry = {};
    };

    function getEventSubscribers(eventable, eventName, needCreate) {
        let registry = eventable._eventable_registry;

        if (eventName in registry) {
            return registry[eventName];

        } else if (needCreate) {
            return registry[eventName] = [];
        }

        return null;
    }

    eventablePrototype.on = function (eventName, handler, ctx) {
        let subscribers = getEventSubscribers(this, eventName, true);

        subscribers.push({
            handler: handler,
            ctx: ctx
        });

        return this;
    };

    eventablePrototype.off = function (eventName, handler, ctx) {
        let subscribers = getEventSubscribers(this, eventName);

        if (subscribers) {
            for (let i = subscribers.length; i--;) {
                if ((subscribers[i].handler === handler)
                    && (subscribers[i].ctx === ctx)
                ) {
                    subscribers.splice(i, 1);
                    return this;
                }
            }
        }

        return this;
    };

    eventablePrototype.trigger = function (eventName, data) {
        let subscribers = getEventSubscribers(this, eventName);

        if (subscribers) {
            let subscribersCopy = subscribers.slice();
            for (let i = 0, l = subscribersCopy.length; i !== l; i += 1) {
                subscribersCopy[i].handler.call(subscribersCopy[i].ctx, data);
            }
        }

        return this;
    };

    TODO_APP.modules.Eventable = EventableConstructor;

}());