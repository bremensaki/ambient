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
		this.analyser = this.audioContext.createAnalyser();

		this.gainNode.gain.value = 0.01;
		this.analyser.fftSize = 256;

		this.gainNode.connect(this.audioContext.destination);
		this.analyser.connect(this.audioContext.destination);

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
				this.gainNode.gain.setValueAtTime(0.01, this.audioContext.currentTime);
				this.gainNode.gain.exponentialRampToValueAtTime(0.6, (this.audioContext.currentTime + 10));
				this.gainNode.gain.setTargetAtTime(0.01, this.audioContext.currentTime + (duration - 10), 2);

				sound.connect(this.gainNode);
				sound.connect(this.analyser);
				sound.buffer = buffer;
				sound.start(0);
				sound.stop(this.audioContext.currentTime + duration);
			},
			function(e){ console.log("Error with decoding audio data" + e.err); });
		}
		request.send();	  
	},
};