function draw () {
    var nums = document.getElementById("num").value;
    var values = nums.split(",");

    var canvas = document.getElementById("barCanvas");
    var ctx = canvas.getContext("2d");

    var x = 0;
    var y = 0;
    var width = 50;

    for(let i = 0; i < values.length; i ++) {
        var height = values[i];
        y = canvas.height - height; 
        ctx.fillRect(x,y,width,height);
        x += width + 15;
    }
}

function reset() {
    var canvas = document.getElementById("barCanvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width, canvas.height);
}

function drawLineChart() {
    console.log("lets beigin")
}