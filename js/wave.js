'use strict';

var w = {};

/*========================================
Utility
========================================*/

w.PI = Math.PI;
w.TAU = w.PI * 2;

w.rand = function (min, max) {
    if (!max) {
        var max = min;
        min = 0;
    }
    return Math.random() * (max - min) + min;
};

/*========================================
Initialize
========================================*/

w.init = function () {
    w.c = document.querySelector('canvas');
    w.ctx = w.c.getContext('2d');
    w.simplex = new SimplexNoise();
    w.events();
    w.reset();
    w.loop();
};

/*========================================
Reset
========================================*/

w.reset = function () {
    w.w = window.innerWidth;
    w.h = window.innerHeight;
    w.cx = w.w / 2;
    w.cy = w.h / 2;
    w.c.width = w.w;
    w.c.height = w.h;

    w.count = Math.floor(w.w / 50);
    w.xoff = 0;
    w.xinc = 0.05;
    w.yoff = 0;
    w.yinc = 0.003;
    w.goff = 0;
    w.ginc = 0.003;
    w.y = w.h * 0.66;
    w.length = w.w + 10;
    w.amp = 40;
};

/*========================================
Event
========================================*/

w.events = function () {
    window.addEventListener('resize', w.reset.bind(undefined));
};

/*========================================
Wave
========================================*/

w.wave = function () {
    w.ctx.beginPath();
    var sway = w.simplex.noise2D(w.goff, 0) * w.amp;
    for (var i = 0; i <= w.count; i++) {
        w.xoff += w.xinc;
        var x = w.cx - w.length / 2 + w.length / w.count * i;
        var y = w.y + w.simplex.noise2D(w.xoff, w.yoff) * w.amp + sway;
        w.ctx[i === 0 ? 'moveTo' : 'lineTo'](x, y);
    }
    w.ctx.lineTo(w.w, w.h);
    w.ctx.lineTo(0, w.h);
    w.ctx.closePath();
    w.ctx.fillStyle = 'hsla(210, 90%, 50%, 0.2)';
    w.ctx.fill();
};

/*========================================
Loop
========================================*/

w.loop = function () {
    requestAnimationFrame(w.loop);
    w.ctx.clearRect(0, 0, w.w, w.h);
    w.xoff = 0;
    w.wave();
    w.wave();
    w.wave();
    w.wave();
    w.yoff += w.yinc;
    w.goff += w.ginc;
};

/*========================================
Start
========================================*/

w.init();