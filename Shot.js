// canvas variabelen
var canvas = document.getElementById("Canvas");
var ctx = canvas.getContext("2d");
var cw = canvas.width;
var ch = canvas.height;
var bb = canvas.getBoundingClientRect();
var offsetX = bb.left;
var offsetY = bb.top;
ctx.fillStyle = "blue";

// variabelen schieten
var shotColor = ctx.fillStyle;
var started, mouseX, mouseY, dx, dy;

// Shots fired
var shots = [] //Bullet array

//Object
    function Shot(x, y, dx, dy) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
    }
Shot.prototype.display = function () {
    // make fillstyle blue if it's not already blue
    if (!ctx.fillStyle == shotColor) {
        ctx.fillStyle = shotColor;
    }
    // teken het schot
    ctx.fillRect(this.x, this.y, 5, 5);
}

// listen for mouse events
canvas.onmousedown = function (e) {
    started = true;
    setFirePosition(e);
}
canvas.onmouseup = function (e) {
    started = false;
}
canvas.onmousemove = function (e) {
    if (started) {
        setFirePosition(e);
    }
}

// start the animation loop
requestAnimationFrame(animate);

//Schieten
function setFirePosition(e) {
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);
    dx = (mouseX >= canvas.width / 2) ? -3 : 3;
    dy = (mouseY >= canvas.height / 2) ? -3 : 3;
}

// animation loop
// add shots if the mouse is down
// move shots until they move off-canvas
function animate() {

    // request another frame
    requestAnimationFrame(animate);

    // if the mouse is down, add a shot
    if (started) {
        shots.push(new Shot(mouseX, mouseY, dx, dy));
    }

    // if no work to do, return
    if (shots.length == 0) {
        return;
    }

    // new array of active shots
    // "active" == shot has not moved off-canvas
    var a = [];

    // clear the canvas for this frame
    ctx.clearRect(0, 0, cw, ch);

    for (var i = 0; i < shots.length; i++) {

        // get a shot to process
        var shot = shots[i];

        // move this shot
        shot.x += shot.dx;
        shot.y += shot.dy;

        // draw this shot
        if (shot.x >= 0 && shot.x <= cw && shot.y > 0 && shot.y <= ch) {
            a.push(shot);
            shot.display();
        }
    }

    // if shots went off-canvas, remove them from shots[]
    if (a.length < shots.length) {
        shots.length = 0;
        Array.prototype.push.apply(shots, a);
    }

}
