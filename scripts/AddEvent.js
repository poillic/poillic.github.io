function addEventsCapabilities(object) {
	object.listenersFor = {};

	object.on = function(eventName, callback) {
		if (!this.listenersFor[eventName]) {
			this.listenersFor[eventName] = [];
		}
		this.listenersFor[eventName].push(callback);
	};

	object.emit = function () {
		var args = Array.prototype.slice.call(arguments);
		var eventName = args.shift();

		var listeners = this.listenersFor[eventName];
		for (var i=0; i < listeners.length; i++) {
			try {
				listeners[i].apply(this, args);
			} catch (e) {
				console.warn('Error on event ' + eventName);
				throw(e);
			}
		}
	}
}