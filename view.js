function View(canvas) {
    this.canvas = canvas;
    this.clicks = [];
    this.frameRate = 1000/30;
    this.maxRadius = 80;
    this.loopRate = 5000;
};

View.prototype.updateDisplay = function() {
    var view = this;
    var context = view.canvas.getContext("2d");
    context.clearRect(0, 0, view.canvas.width, view.canvas.height);
    context.fillStyle = '#581010';
    context.fillRect(0, 0, view.canvas.width, view.canvas.height);

    for (var i = 0; i < view.clicks.length; i++) {
        var circle = view.clicks[i];
        if (circle.radius > view.maxRadius) continue;
        circle.radius += 1;

        var alpha = .7;
        if (circle.radius > (view.maxRadius - 15)) {
            alpha = (view.maxRadius - circle.radius) / 10;
        }
        view.drawCircle(context, circle.x, circle.y, circle.radius, alpha);
    }
};

View.prototype.drawCircle = function(context, x, y, radius, alpha) {
    context.beginPath();
    context.arc(x, y, radius, 0, 2*Math.PI);
    context.fillStyle = "rgba(" + x%256 + ", " + y%256 + ", " + (x * y % 256)+ " ," + alpha + ")";
    context.fill();
};