window.onload = function() {
    var bufferLoader = new BufferLoader(
        Audio.audioContext,
        [
            "A4.mp3",
            "A5.mp3",
            "C4.mp3",
            "C5.mp3",
            "D4.mp3",
            "D5.mp3",
            "E4.mp3",
            "E5.mp3",
            "G4.mp3",
            "G5.mp3",
        ],
        finishedLoading
    );
    bufferLoader.load();

    function finishedLoading(bufferList) {
        Audio.init(bufferList);
    }

    var canvas = document.getElementById('canvas');
    var view = new View(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    setInterval(view.updateDisplay.bind(view), view.frameRate);
    setInterval(spawnNote.bind(view), 4000);

    function spawnNote() {
        var x =  Math.floor(Math.random() * window.innerWidth);
        var y =  Math.floor(Math.random() * window.innerHeight);
        var trim = (1 - Math.floor(Math.random() * 70) / 100);
        var lifetime = Math.floor(Math.random() * 5);
        var pos = view.clicks.push({x: x, y: y, radius: 0});
        
        Audio.play(x%10);
        
        var interval = setInterval(audioplay, (view.loopRate * trim));
        
        function audioplay() {
            view.clicks[pos-1].radius = 0;
            Audio.play(x%10);
            lifetime--;
            if (lifetime <= 0){
                clearInterval(interval);
            }
        }
    };
};