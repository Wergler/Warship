let state;

function CanvasState(cvs) {
    this.canvas = cvs;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.ctx = this.canvas.getContext('2d');
    this.valid = false;
    this.shapes = [];
    dragging = false;
    this.selection = null;
    this.dragoffx = 0;
    this.dragoffy = 0;
    state = this;
    //Disables double click
    this.canvas.addEventListener('selectstart', function (e) { e.preventDefault(); return false; }, false);
    //Controls ship selection
    this.canvas.addEventListener('mousedown', function (state, e) {
        let mouse = state.getMouse(e);
        let mx = mouse.x;
        let my = mouse.y;
        let shapes = state.shapes;
        let len = shapes.length;
        for (let i = len - 1; i >= 0; i--) {
            if (shapes[i].contains(mx, my)) {
                let mySel = shapes[i];
                state.dragoffx = mx - mySel.x;
                state.dragoffy = my - mySel.y;
                state.dragging = true;
                state.selection = mySel;
                state.valid = false;
                return;
            }
            if (state.selection) {
                state.selection = null;
                state.valid = false;
            }
        }

    }.bind(this.canvas, this), true);
    //Controls mouse movement
    this.canvas.addEventListener('mousemove', function (state, e) {
        if (state.dragging) {
            let mouse = state.getMouse(e);
            state.selection.x = mouse.x - state.dragoffx;
            state.selection.y = mouse.y - state.dragoffy;
            state.valid = false;

            let cvsOffset = findPos(document.getElementById("grid-background"));;
            let distances = [];
            for (let j = 0; j < cells[0].length; j++) {
                let point = cells[0][j] + cvsOffset.x;
                distances[j] = Math.abs(state.selection.x - point);

                //if (poin {

                //}


            }
        distances.sort();
        console.log(cvsOffset);
        }
    }.bind(this.canvas, this), true);

    //Stops dragging the ship if user is not holding down on the mouse
    this.canvas.addEventListener('mouseup', function (state, e) {
        state.dragging = false;
    }.bind(this.canvas, this), true);

    // ***** Options! *****

    this.selectionColor = '#CC0000';
    this.selectionWidth = 2;
    this.interval = 30;
    setInterval(function () {state.draw();}, this.interval);
}

CanvasState.prototype.addShape = function(shape) {
    this.shapes.push(shape);
    this.valid = false;
}
CanvasState.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
}
CanvasState.prototype.draw = function() {
    if (!this.valid) {
        let ctx = this.ctx;
        let shapes = this.shapes;
        this.clear();
        //Stuff drawn in the background
        //Draw all shapes
        let len = shapes.length;
        for (let i = 0; i < len; i++) {
            let shape = shapes[i];
            if (shape.x > this.width || shape.y > this.height ||
                shape.x + shape.w < 0 || shape.y + shape.h < 0)
                continue;
            shapes[i].draw(ctx);
        }
        //Draw border when selected
        if (this.selection != null) {
            ctx.strokeStyle = this.selectionColor;
            ctx.lineWidth = this.selectionWidth;
            let mySel = this.selection;
            ctx.strokeRect(mySel.x, mySel.y, mySel.w, mySel.h);
        }
        //Stuff drawn in the foreground
        this.valid = true;
    }
}
CanvasState.prototype.getMouse = function(e) {
    let element = this.canvas, offsetX = 0, offsetY = 0, mx, my;
    if (element.offsetParent !== undefined) {
        do {
            offsetX += element.offsetLeft;
            offsetY += element.offsetTop;
        } while ((element = element.offsetParent));
    }
    //offsetX += this.stylePaddingLeft + this.styleBorderLeft + this.htmlLeft;
    //offsetY += this.stylePaddingTop + this.styleBorderTop + this.htmlTop; ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! !
    mx = e.pageX - offsetX;
    my = e.pageY - offsetY;
    return { x: mx, y: my };
}
  
    
    
    
    
