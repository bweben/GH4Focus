// Eine Einführung zur leeren Vorlage finden Sie in der folgenden Dokumentation:
// https://go.microsoft.com/fwlink/?LinkId=232509

(function () {
	"use strict";

	var app = WinJS.Application;
	var activation = Windows.ApplicationModel.Activation;
	var isFirstActivation = true;

	app.onactivated = function (args) {
		if (args.detail.kind === activation.ActivationKind.voiceCommand) {
			// TODO: Behandeln relevanter "ActivationKinds". Wenn Ihre App beispielsweise durch Sprachbefehle gestartet werden kann,
			// ist es sinnvoll, hier zu entscheiden, ob ein Eingabefeld mit Daten aufgefüllt oder eine andere anfängliche Ansicht ausgewählt werden soll.
		}
		else if (args.detail.kind === activation.ActivationKind.launch) {
			// Eine Startaktivierung tritt auf, wenn der Benutzer Ihre App über die Kachel startet
			// oder eine Popupbenachrichtigung aufruft, indem er auf den Text klickt oder tippt.
			if (args.detail.arguments) {
				// TODO: Wenn die App Popups unterstützt, verwenden Sie diesen Wert aus der Popupnutzlast, um festzulegen, wohin in der App
				// der Benutzer als Reaktion auf seinen Aufruf der Popupbenachrichtigung gelangt.
			}
			else if (args.detail.previousExecutionState === activation.ApplicationExecutionState.terminated) {
				// TODO: Diese Anwendung wurde angehalten und dann beendet, um Speicher freizugeben.
				// Um für ein nahtloses Benutzererlebnis zu sorgen, stellen Sie den Anwendungszustand hier wieder her, sodass es aussieht, als wäre die Ausführung der App nie beendet worden.
				// Hinweis: Sie möchten ggf. die Zeit aufzeichnen, zu der die App zuletzt angehalten wurde, und den Zustand nur wiederherstellen, wenn sie nach einem kurzen Zeitraum zurückgekehrt ist.
			}
		}

		if (!args.detail.prelaunchActivated) {
			// TODO: Wenn "prelaunchActivated" TRUE ist, bedeutet dies, dass die Anwendung im Hintergrund als Optimierung vorab gestartet wurde.
			// In diesem Fall würde sie im unmittelbaren Anschluss angehalten.
			// Alle Vorgänge mit langer Ausführungszeit (z. B. teure Netzwerk- oder Datenträger-E/A) oder Änderungen des Benutzerzustands, die beim Start auftreten,
			// sollten hier erfolgen (um zu verhindern, dass sie im Fall eines Vorabstarts ausgeführt werden).
			// Alternativ können diese Aufgaben in einem resume- oder visibilitychanged-Handler ausgeführt werden.
		}

		if (isFirstActivation) {
			// TODO: Der App wurde aktiviert und wurde nicht ausgeführt. Nehmen Sie hier die allgemeine Startinitialisierung vor.
			document.addEventListener("visibilitychange", onVisibilityChanged);
            args.setPromise(WinJS.UI.processAll());

            //http://192.168.54.1/cam.cgi?mode=startstream&value=49152

            socketsSample.listener = new Windows.Networking.Sockets.DatagramSocket();
            var serverPort = "49152";
            var serverIp = "192.168.54.1";
            socketsSample.closing = false;
            socketsSample.listener.addEventListener("messagereceived", function (eventArgument) {
                console.log(eventArgument);
            });
            socketsSample.listener.bindServiceNameAsync(serverPort).done(function () {
                console.log("Server: listener creation completed.");
            }, function(reason) {
                console.log(reason);
            });

		    console.log("hallo");
		}

		isFirstActivation = false;
	};

	function onVisibilityChanged(args) {
		if (!document.hidden) {
			// TODO: Die App wurde soeben sichtbar. Dies ist ggf. ein guter Zeitpunkt für die Aktualisierung der Ansicht.
		}
	}

	app.oncheckpoint = function (args) {
		// TODO: Diese Anwendung wird gleich angehalten. Speichern Sie hier alle Status, die über die das Anhalten hinaus beibehalten werden sollen.
		// Sie können das WinJS.Application.sessionState-Objekt verwenden, das automatisch gespeichert und über alle Anhaltevorgänge hinweg wiederhergestellt wird.
		// Wenn Sie vor dem Anhalten der Anwendung einen asynchronen Vorgang abschließen müssen, rufen Sie "args.setPromise()" auf.
	};

	app.start();

})();
