var socketsSample = {};

(function () {
    "use strict";

    socketsSample.listener = null;
    socketsSample.listenerOutputStream = null;
    socketsSample.listenerPeerAddress = null;
    socketsSample.listenerPeerPort = null;
    socketsSample.clientSocket = null;
    socketsSample.clientDataWriter = null;
    socketsSample.connected = false;
    socketsSample.closing = false;
    socketsSample.bindingToService = false;

    socketsSample.close = function () {

        socketsSample.closing = true;

        if (socketsSample.listener) {
            socketsSample.listener.close();
        }

        if (socketsSample.clientSocket) {
            socketsSample.clientSocket.close();
        }

        socketsSample.listener = null;
        socketsSample.listenerOutputStream = null;
        socketsSample.listenerPeerAddress = null;
        socketsSample.listenerPeerPort = null;
        socketsSample.clientSocket = null;
        socketsSample.clientDataWriter = null;
        socketsSample.connected = false;
    };
})();
