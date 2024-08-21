
 function updateCanvases() { // Canvases Opponent and Player
    /*cvs = bk.canvas;
    for (var i = 0; i < NUM_OF_SHIPS; i++) {
        bk.shapes[i].xPer = bk.shapes[i].x / cvs.width * 100; 
        bk.shapes[i].yPer = bk.shapes[i].y / cvs.height * 100;
        bk.shapes[i].ratio = bk.shapes[i].y / bk.shapes[i].x; 
        console.log(bk.shapes[i].ratio);
    }
    if(window.innerWidth > window.innerHeight){
        cvs.width = cvs.clientWidth;
        cvs.height = cvs.clientHeight;
        for (var i = 0; i < NUM_OF_SHIPS; i++) {
            bk.shapes[i] = new Shape(bk.shapes[i].xPer * cvs.width / 100, bk.shapes[i].yPer * cvs.height / 100, cvs.width/5,cvs.width/5);
        }
    }   
    else {
        cvs.width = cvs.clientWidth;
        cvs.height = cvs.clientHeight;
        for (var i = 0; i < NUM_OF_SHIPS; i++) {
            bk.shapes[i] = new Shape(bk.shapes[i].xPer * cvs.width / 100, bk.shapes[i].yPer * cvs.height / 100, cvs.height/5,cvs.height/5);
        }
    }

    bk.width = cvs.width;
    bk.height = cvs.height;
    bk.selection = null /*bk.shapes.find(function(obj) { 
        return obj === bk.selection;
    });
    bk.valid = false;
    bk.draw(); */
    if(window.innerWidth > window.innerHeight){
        plGrid.width = plGrid.clientWidth;
        plGrid.height = plGrid.clientWidth;

        opGrid.width = opGrid.clientWidth;
        opGrid.height = opGrid.clientWidth;
    }   
    else {
        plGrid.width = plGrid.clientHeight;
        plGrid.height = plGrid.clientHeight;

        opGrid.width = opGrid.clientHeight;
        opGrid.height = opGrid.clientHeight;
    }

    if (gameSet) {
      drawGrid(plGrid.width, plGrid.height, 0, true);
    
     
    }
    else {
      if (isTouchDevice()) {
          console.log("Touch Device");
      }
      else {
          opGridCtx.clearRect(0,0,opGrid.width, opGrid.height);
          vtHeight = opGrid.width/25;
          vtFont = vtHeight.toString() + "px VT323";
          vtOffsetLeft = opGrid.width/3.5;
          console.log(vtFont);
          opGridCtx.font = vtFont;
          opGridCtx.fillText("Click to Place the Vessel", vtOffsetLeft, opGrid.height/2);
          opGridCtx.fillText("Use the Arrrow Keys to Rotate the Vessel", vtOffsetLeft/1.8, opGrid.height/2 + vtHeight);
      }

      if (!gridDrawn) {
        drawGrid(plGrid.width, plGrid.height, 0); // 0 specifies the player grid
          gridDrawn = true;
      } 
      else {
        drawGrid(plGrid.width, plGrid.height, 0); // 0 specifies the player grid
          if (currentCell != null) {
              redrawGrid(true); // "true" tells redrawGrid that it is redrawing because of resizing.
          }
      }  
    }
  }

//https://simonsarris.com/making-html5-cvs-useful/
//https://stackoverflow.com/questions/33934591/the-mouse-drag-selection-does-not-work-on-touch-devices-how-can-i-make-it-possi
//https://www.w3schools.com/howto/howto_js_topnav_responsive.asp
