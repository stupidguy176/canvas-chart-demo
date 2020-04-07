
function LineChart(con) {
    // user defined properties  
    this.canvas = document.getElementById(con.canvasId);
    this.minX = con.minX;
    this.minY = con.minY;
    this.maxX = con.maxX;
    this.maxY = con.maxY;
    this.unitsPerTickX = con.unitsPerTickX;
    this.unitsPerTickY = con.unitsPerTickY;

    // constants  
    this.padding = 10;
    this.tickSize = 10;
    this.axisColor = "#555";
    this.pointRadius = 5;
    this.font = "12pt Calibri";

    this.fontHeight = 12;

    // relationships       
    this.context = this.canvas.getContext("2d");
    this.rangeX = this.maxX - this.minY;
    this.rangeY = this.maxY - this.minY;
    this.numXTicks = Math.round(this.rangeX / this.unitsPerTickX);
    this.numYTicks = Math.round(this.rangeY / this.unitsPerTickY);
    this.x = this.getLongestValueWidth() + this.padding * 2;
    this.y = this.padding * 2;
    this.width = this.canvas.width - this.x - this.padding * 2;
    this.height = this.canvas.height - this.y - this.padding - this.fontHeight;
    this.scaleX = this.width / this.rangeX;
    this.scaleY = this.height / this.rangeY;

    // draw x y axis and tick marks  
    this.drawXAxis();
    this.drawYAxis();
}

LineChart.prototype.getLongestValueWidth = function () {
    this.context.font = this.font;
    var longestValueWidth = 0;
    for (var n = 0; n <= this.numYTicks; n++) {
        var value = this.maxY - (n * this.unitsPerTickY);
        longestValueWidth = Math.max(longestValueWidth, this.context.measureText(value).width);
    }
    return longestValueWidth;
};

LineChart.prototype.drawXAxis = function () {
    var context = this.context;
    context.save();
    context.beginPath();
    context.moveTo(this.x, this.y + this.height);
    context.lineTo(this.x + this.width, this.y + this.height);
    context.strokeStyle = this.axisColor;
    context.lineWidth = 2;
    context.stroke();

    // draw tick marks  
    for (var n = 0; n < this.numXTicks; n++) {
        context.beginPath();
        context.moveTo((n + 1) * this.width / this.numXTicks + this.x, this.y + this.height);
        context.lineTo((n + 1) * this.width / this.numXTicks + this.x, this.y + this.height - this.tickSize);
        context.stroke();
    }

    // draw labels  
    context.font = this.font;
    context.fillStyle = "black";
    context.textAlign = "center";
    context.textBaseline = "middle";

    for (var n = 0; n < this.numXTicks; n++) {
        var label = Math.round((n + 1) * this.maxX / this.numXTicks);
        context.save();
        context.translate((n + 1) * this.width / this.numXTicks + this.x, this.y + this.height + this.padding);
        context.fillText(label, 0, 0);
        context.restore();
    }
    context.restore();
};

LineChart.prototype.drawYAxis = function () {
    var context = this.context;
    context.save();
    context.save();
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.x, this.y + this.height);
    context.strokeStyle = this.axisColor;
    context.lineWidth = 2;
    context.stroke();
    context.restore();

    // draw tick marks  
    for (var n = 0; n < this.numYTicks; n++) {
        context.beginPath();
        context.moveTo(this.x, n * this.height / this.numYTicks + this.y);
        context.lineTo(this.x + this.tickSize, n * this.height / this.numYTicks + this.y);
        context.stroke();
    }

    // draw values  
    context.font = this.font;
    context.fillStyle = "black";
    context.textAlign = "right";
    context.textBaseline = "middle";

    for (var n = 0; n < this.numYTicks; n++) {
        var value = Math.round(this.maxY - n * this.maxY / this.numYTicks);
        context.save();
        context.translate(this.x - this.padding, n * this.height / this.numYTicks + this.y);
        context.fillText(value, 0, 0);
        context.restore();
    }
    context.restore();
};

LineChart.prototype.drawLine = function (data, color, width) {
    console.log('draw line: ', data, color);
    var context = this.context;
    context.save();
    this.transformContext();
    context.lineWidth = width;
    context.strokeStyle = color;
    context.fillStyle = color;
    context.beginPath();
    // context.moveTo(data[0].x * this.scaleX, data[0].y * this.scaleY);

    for (var n = 0; n < data.length; n++) {
        var point = data[n];

        var x = point.x * this.scaleX;
        var y = point.y * this.scaleY;

        // draw segment  
        context.lineTo(x, y);
        context.stroke();
        context.closePath();
        context.beginPath();
        context.arc(x, y, this.pointRadius, 0, 2 * Math.PI, false);
        context.fill();
        context.closePath();

        // position for next segment  
        context.beginPath();
        context.moveTo(x, y);
    }
    context.restore();
};

LineChart.prototype.transformContext = function () {
    var context = this.context;

    // move context to center of canvas  
    this.context.translate(this.x, this.y + this.height);

    // invert the y scale so that that increments  
    // as you move upwards  
    context.scale(1, -1);
};

function add(index) {
    var new_chq_no = parseInt($('#total_chq_' + index).val()) + 1;
    var new_input = "<input type='text' id='new_" + new_chq_no + "'>";
    var br = "<br>";
    $('#new_chq_' + index).append(new_input);
    $('#new_chq_' + index).append(br);
    $('#total_chq_' + index).val(new_chq_no);
}

function remove(index) {
    // var last_chq_no = $(`#line_${index} > #total_chq_${index}`).val();
    var last_chq_no = $(`#total_chq_${index}`).val();

    console.log('last_chq_no', last_chq_no);

    if (last_chq_no > 1) {
        // $('#new_chq_' + index + ' br:even').remove();
        $('#new_chq_' + index + '> #new_' + last_chq_no).remove();
        $('#total_chq_' + index).val(last_chq_no - 1);
    }
}

window.onload = function () {
    // $('.add').on('click', add);
    // $('.remove').on('click', remove);

    var myLineChart = new LineChart({
        canvasId: "myCanvas",
        minX: 0,
        minY: 0,
        maxX: 140,
        maxY: 100,
        unitsPerTickX: 10,
        unitsPerTickY: 10
    });

    // var data = [{
    //     x: 0,
    //     y: 0
    // }, {
    //     x: 20,
    //     y: 10
    // }, {
    //     x: 40,
    //     y: 15
    // }, {
    //     x: 60,
    //     y: 40
    // }, {
    //     x: 80,
    //     y: 60
    // }, {
    //     x: 100,
    //     y: 50
    // }, {
    //     x: 120,
    //     y: 85
    // }, {
    //     x: 140,
    //     y: 100
    // }];

    // myLineChart.drawLine(data, "blue", 3);

    // var data = [{
    //     x: 20,
    //     y: 85
    // }, {
    //     x: 40,
    //     y: 75
    // }, {
    //     x: 60,
    //     y: 75
    // }, {
    //     x: 80,
    //     y: 45
    // }, {
    //     x: 100,
    //     y: 65
    // }, {
    //     x: 120,
    //     y: 40
    // }, {
    //     x: 140,
    //     y: 35
    // }];

    // myLineChart.drawLine(data, "red", 3);
};

function onDraw(index) {
    let arr = [];
    var myLineChart = new LineChart({
        canvasId: "myCanvas",
        minX: 0,
        minY: 0,
        maxX: 140,
        maxY: 100,
        unitsPerTickX: 10,
        unitsPerTickY: 10
    });
    var limit = parseInt($('#total_chq_' + index).val()) - 1;
    console.log({limit})
    for (let i = 0; i < limit; i++) {
        let test = $(`#new_chq_${index} > #new_${i + 2}`).val();
        console.log({test})
        let nums = test.split(",");
        let point = {
            x: parseInt(nums[0]),
            y: parseInt(nums[1])
        };
        arr.push(point);
    }

    let color = getColor(index);

    myLineChart.drawLine(arr, color, 3);
}

function onClear(index) {
    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function addDiv() {
    var new_chq_no = parseInt($('#total_line').val()) + 1;
    var new_div = "<div id='line_" + new_chq_no + "'></div>";

    $('#linner').append(new_div);
    $('#total_line').val(new_chq_no);

    var content = `
        <p>Line ${new_chq_no}</p>
        <input id="color_picker_${new_chq_no}" type="color"/>
        <button class="add" onclick="add(${new_chq_no})">Add</button>
        <button class="remove" onclick="remove(${new_chq_no})">remove</button>
        <br>
        <div id="new_chq_${new_chq_no}"></div>
        <input type="hidden" value="1" id="total_chq_${new_chq_no}">
        <button onclick="onDraw(${new_chq_no})">Get me</button>
        <button onclick="onClear(${new_chq_no})">Clear</button>
    `;

    $(`#line_${new_chq_no}`).append(content);

}

function removeDiv() {
    var last_chq_no = parseInt($('#total_line').val());
    if (last_chq_no > 1) {
        // $('#line_' + last_chq_no).remove();
        $('#linner > #line_' + last_chq_no).remove();
        $('#total_line').val(last_chq_no - 1);
    }
}

function getColor(index = 1) {
    let colorInput = document.querySelector("#color_picker_" + index);
    let color = colorInput.value;
    return color;
}