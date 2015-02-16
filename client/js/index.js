$(document).ready(() => {
	let socket = io.connect();

	socket
		.emit('init', {

		})
		.on('response', (data) => {

		});
});
