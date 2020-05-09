var canvas = document.getElementById("canvas");
// // var input = document.getElementById('input');


canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
var ctx = canvas.getContext('2d');

ctx.fillStyle = "green";
// var audio_box = document.getElementById("audio_box");

var audio = document.getElementById('audio');
var button = document.getElementById("play");






button.addEventListener('click', function() {
    // console.log(input);
    // console.log(input.src);
    if (audio.paused) {
        audio.play()
            .then(() => {
                console.log('done');
                console.log(audio.source)
            })
            .catch(err => {
                console.log(err);
            })

    } else {
        audio.pause();
    }
})



window.addEventListener('load', init, false);
var audioContext, analyzer, source, Context, fbc_array;

function init() {
    Context = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContext();
    console.log(audioContext)
    analyzer = audioContext.createAnalyser();
    source = audioContext.createMediaElementSource(audio);
    console.log(source)
    source.connect(analyzer);
    analyzer.connect(audioContext.destination);

    framelooper();
}


document.querySelector('#play').addEventListener('click', function() {
    audioContext.resume().then(() => {
        console.log('Playback resumed successfully');
    });
});


var colorArray = ['red', 'blue', 'yellow', 'green', 'violet', 'white', 'lightblue', 'forestgreen'];


var bar_height, bar_width = 3,
    x = 0;


function bar(i) {
    this.i = i;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.update = function() {
        // console.log(this.i);
        this.bar_height = -(fbc_array[this.i] * 2);
        ctx.fillStyle = this.color;
        ctx.fillRect(x, canvas.height, bar_width, this.bar_height);
    }

}

var rec = [],
    i;
for (i = 0; i < 200; i++) {
    rec.push(new bar(i));
}

function framelooper() {
    window.requestAnimationFrame(framelooper);
    fbc_array = new Uint8Array(analyzer.frequencyBinCount);
    analyzer.getByteFrequencyData(fbc_array);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // var bar_width = 3;
    x = 0;
    for (var i = 0; i < 200; i++) {
        rec[i].update();
        x += 10;
    }





    // }
}