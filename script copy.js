function draw() {
    /* Accepting and seperating comma seperated values */
    var n = document.getElementById("num").value;
    var values = n.split(',');

    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');

    var width = 40; //bar width
    var X = 0; // first bar position 
    var base = 200;

    ctx.fillStyle = '#008080';
    /* text to display Bar number */
    ctx.fillStyle = '#4da6ff';
    for (var i = 0; i < values.length; i++) {
        var h = values[i];
        ctx.fillRect(X, canvas.height - h, width, h);
        X += width + 15;
        ctx.fillText('Bar ' + h, X - 50, canvas.height - h - 10);
    }
    /* Text to display scale */
    ctx.fillStyle = '#000000';
    ctx.fillText('Scale X : '+ canvas.width + ' Y : ' + canvas.height, 400, 10);

}
function reset() {
    var canvas = document.getElementById('myCanvas');
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

window.onload = draw();