var Audio = {
	gainNode: undefined,
	bufferList: undefined,
	audioContext: new (window.AudioContext ||
	                   window.webkitAudioContext)(),
	init: function(bufferList) {
		this.bufferList = bufferList;
		this.gainNode = this.audioContext.createGain();
		this.gainNode.gain.value = 1;
		this.gainNode.connect(this.audioContext.destination);
	},
	play: function(i) {
		var sound = this.audioContext.createBufferSource();
		sound.connect(this.gainNode);
		sound.buffer = this.bufferList[i];
		sound.start(0);
		sound.stop(this.audioContext.currentTime + 10);
	},
};

var Background = {
	gainNode: undefined,
	bufferList: undefined,
	audioContext: new (window.AudioContext ||
	                   window.webkitAudioContext)(),
	init: function(trackList) {
		this.trackList = trackList;
		this.gainNode = this.audioContext.createGain();
		this.gainNode.gain.value = 0.4;
		this.gainNode.connect(this.audioContext.destination);
	},
	play: function(i, duration) {
		var sound = this.audioContext.createBufferSource();
		var request = new XMLHttpRequest();

		request.open('GET', this.trackList[i], true);
		request.responseType = 'arraybuffer';

		request.onload = () => {
			const audioData = request.response;
			this.audioContext.decodeAudioData(
			  audioData,
			  (buffer) => {
				sound.connect(this.gainNode);
				sound.buffer = buffer;
				sound.start(0);
				// A graceful fade would be good here
				sound.stop(this.audioContext.currentTime + (duration - 5));
			},
			function(e){ console.log("Error with decoding audio data" + e.err); });
		}
		request.send();
	},
};