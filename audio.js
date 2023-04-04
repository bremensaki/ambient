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
	init: function(bufferList) {
		this.bufferList = bufferList;
		this.gainNode = this.audioContext.createGain();
		this.gainNode.gain.value = 0.3;
		this.gainNode.connect(this.audioContext.destination);
	},
	play: function(i, duration) {
		var sound = this.audioContext.createBufferSource();
		sound.connect(this.gainNode);
		sound.buffer = this.bufferList[i];
		sound.start(0);
		// A graceful fade would be good here
		sound.stop(this.audioContext.currentTime + (duration - 5));
	},
};