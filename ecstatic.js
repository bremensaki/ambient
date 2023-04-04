window.onload = function() {
    var playbutton = document.getElementById('play');
    var canvas = document.getElementById('canvas');
    var view = new View(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var bufferLoader = new BufferLoader(
        Audio.audioContext,
        [
            "audio/A4.mp3",
            "audio/A5.mp3",
            "audio/C4.mp3",
            "audio/C5.mp3",
            "audio/D4.mp3",
            "audio/D5.mp3",
            "audio/E4.mp3",
            "audio/E5.mp3",
            "audio/G4.mp3",
            "audio/G5.mp3",
        ],
        finishedLoading
    );
    bufferLoader.load();

    var backgroundLoader = new BufferLoader(
        // CC0 content from freesound.org currently, need to replace
        // and normalise volume for all
        Background.audioContext,
        [
            "audio/background/crowd.mp3",
            "audio/background/storm.mp3",
            "audio/background/waves.mp3",
            "audio/background/rain.mp3",
            "audio/background/steps.mp3",
        ],
        finishedBackground
    );

    setInterval(view.updateDisplay.bind(view), view.frameRate);

    function finishedLoading(bufferList) {
        document.getElementById('play').style.display = 'block';
        playbutton.addEventListener("click", function (){
            backgroundLoader.load();
            playbutton.style.display = "none";
            setInterval(spawnNote.bind(view), view.loopRate);
        });
        Audio.init(bufferList);
    }

    function finishedBackground(bufferList) {
        var duration = 15; // runtime for background in minutes

        Background.init(bufferList);
        Background.play(Math.floor(Math.random() * 5), (duration * 60)); // duration in seconds

        var interval = setInterval(bgplay, (duration * 60000)); // duration in milliseconds
        function bgplay() {
            Background.play(Math.floor(Math.random() * 5), (duration * 60));
        }
    }

    function spawnNote() {
        var x =  Math.floor(Math.random() * window.innerWidth);
        var y =  Math.floor(Math.random() * window.innerHeight);
        var trim = (1 - Math.floor(Math.random() * 70) / 100);
        var lifetime = Math.floor(Math.random() * 6);
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