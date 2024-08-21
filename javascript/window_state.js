export function init() {
  //$(document).unbind('jsonready', init());
  getWords();
  console.log("bruh")
  //console.log(isTouchDevice()); <--------------------------------------- current problem

   //op = new CanvasState(document.getElementById('grid-opponent'));
   //for (var i = 0; i < NUM_OF_SHIPS; i++) {
   //    op.addShape(new Shape(0,0,0,0));
   //}

   //pl = new CanvasState(document.getElementById('grid-player'));

  /* bk = new CanvasState(document.getElementById('grid-background'));
   for (var i = 0; i < NUM_OF_SHIPS; i++) {
    bk.addShape(new Shape(0,0,0,0));
   }*/
   console.log(gameSet);
   if (gameSet) {
     getDirections();
     console.log("the game is in the setup stage");

     drawGrid(plGrid.width, plGrid.height, 0, true);
     plGrid.removeEventListener('mousedown', cellSelected, true);
     plGrid.removeEventListener('mousemove', displayShip, true);
     $(document).unbind();
   
    if (!jsonSet) {
      setJson();
    }

     opGrid.addEventListener('mousedown', function(){drawGrid(plGrid.width, plGrid.height, 0, true);}, true);
   }
   else {
    console.log("the game hasn't started yet");
    plGrid.addEventListener('mousedown', cellSelected, true);  
    plGrid.addEventListener('mousemove', displayShip, true);
    $(document).on("keydown", function(e) {
      if(e.which == 82) {
        if(shipDirection != 3) {
          shipDirection++;
        }
        else {
          shipDirection = 0;
        }  
      }
      /*switch(e.which) {
        case 37: // left
        shipDirection = 0;
        horizontal = true;
        redrawGrid(false); 
        break;
        case 38: // up
        shipDirection = 1;
        horizontal = false;
        redrawGrid(false); 
        break;
        case 39: // right
        shipDirection = 2;
        horizontal = true;
        redrawGrid(false); 
        break;
        case 40: // down
        shipDirection = 3;
        horizontal = false;
        redrawGrid(false); 
        break;   
        default: return; // exit this handler for other keys
    }*/
    e.preventDefault(); // prevent the default action (scroll / move caret)
    });
  }

  update();
}

//function windowState() {

//}

export function update() {
  console.log("resized");
  if (!gameStart) { 
    $( "#dialog" ).dialog( "option", "height", $("#grid-player").height()/1.2 );
    $( "#dialog" ).dialog( "option", "width", $("#grid-player").width()/1.2 );
  }
  else {
    $("#shader").css({"height" : 0, "width" : 0});
    updateCanvases();
  }
  //console.log($("#grid-player"));
 }

 function cellSelected(e)
 {
  console.log("cellSelected");
  var mouse = getMouse(plGrid, e);
  var ocCells = getOccupiedCells();
  var overlapping = false;
  if (1 == e.which) {
    for (var i = 0; i < currentShipLocation.length; i++){
      for (var j = 0; j < ocCells.length; j++) {
        if (ocCells[j] == currentShipLocation[i]) {
          overlapping = true;
          return
        }
      }
    }
    if (!overlapping) {
      var ship = currentShipLocation.slice(); //slice creates a new array with the same attributes without referring back to the old one - do not confuse with "splice".
      currentShipLocation = []; //clear the array to make room for next ship;
      placedShips.push(ship);
      currentShip++;
      if (currentShip == NUM_OF_SHIPS) {
        gameSet = true;
        init();
      }
    }
  }
 }

 function displayShip(e)
  {
    plGridCtx.clearRect(0,0,plGrid.width, plGrid.height); // clear field
    mouse = getMouse(plGrid, e);
    redrawGrid(false); 
  }
 
  function setJson() {
    var Ship = function() {
      this.type = shipImages[i];
      this.cells = [];
      this.orientation = getOrientation(i); 
      this.direction = shipDirections[i];
    }
    var Cell = function() {
      this.is_hit = false;
      this.position = placedShips[i][j];
      this.hidden_letter = wordsToGuess[i][j];
    }
    gameState.gameSet = true;
    gameState.players[0].ships = [];
    for (var i = 0; i < placedShips.length; i++) {
      gameState.players[0].ships.push(new Ship());
      for (var j = 0; j < placedShips[i].length; j++) {
        gameState.players[0].ships[i].cells.push(new Cell());
      }
    }
    gameState.players[0].guesses = []; 
    gameState.jsonSet = true;
    updateJson();
  }
 
  function getWords() {
    let url = "..\\spelling_lists\\normal.txt" //later add costumization so it can be other grades.
    let e = $.get(url)
    .then(result => {
      console.log(e);
      for (var i = 0; i < NUM_OF_SHIPS; i++) {
        wordsToGuess.push(result[Math.floor(Math.random() * result.length)].replace(/\r/g, ""));
      }
      wordsToGuess.sort(function(a, b){
        // ASC  -> a.length - b.length
        // DESC -> b.length - a.length
      return b.length - a.length;
      });
    // Code depending on result
    })
    .catch(ex => {
      console.log("Get Words failed.")
    // An error occurred
   });
  }

  function getOrientation(i) {
    console.log((placedShips[i][1]));
    console.log(placedShips[i][0]);
    if (placedShips[i][0] == placedShips[i][1]-1) { //checks if the next cell is one over - implying it is horizontal.
      return "horizontal";
    }
    else {
      return "vertical";
    }

  }

  function getDirections() {
    for (var i = 0; i < placedShips.length; i++) {
      var imgTxt = cells[placedShips[i][0]].getImage(); // DOES NOT FUNCTION AT ALL!!
      console.log(imgTxt + "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      if (imgTxt.search("left") != -1) {shipDirections.push("left");}
      if (imgTxt.search("up") != -1) {shipDirections.push("up");}
      if (imgTxt.search("right") != -1) {shipDirections.push("right");}
      if (imgTxt.search("down") != -1) {shipDirections.push("down");}
    }
  }