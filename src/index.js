const EventBusFactory = () => {
    const listeners = {};

    /**
     * Broadcast payload to subscribed listeners
     *
     * @param event
     * @param payload
     * @returns {*[]}
     */
    const fire = (event, payload) => {
        if (listeners.hasOwnProperty(event) && Array.isArray(listeners[event])) {
            return listeners[event].map(fn => fn(payload));
        }
        return [];
    };

    /**
     * Register an event with listener.
     *
     * @param event
     * @param listener
     */
    const listen = (event, listener) => {
        if (!Array.isArray(listeners[event])) {
            listeners[event] = [listener];
            return;
        }
        listeners[event].push(listener);
    };

    /**
     * Unsubscribe based on event and listener
     *
     * @param event
     * @param removeListener
     * @returns {*[]}
     */
    const unsubscribe = (event, removeListener) => {
        if (listeners.hasOwnProperty(event) && Array.isArray(listeners[event])) {
            listeners[event] = listeners[event].filter(fn => (fn.toString() !== removeListener.toString()));
        }
        return listeners[event];
    };

    return {
        fire,
        listen,
        unsubscribe,
    };
};

module.exports = EventBusFactory;
