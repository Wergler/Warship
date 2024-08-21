
function drawGrids(width, height) {
    for (var i = 0; i < grids.length; i++) {
        drawGrid(width, height, i);
    }
        
}

function drawGrid(width, height, id, fromJson = false) {
  console.log(wordsToGuess);
  ctx = grids.item(id).getContext('2d');

  ctx.clearRect(0, 0, cvsWidth, cvsHeight);
  ctx.beginPath();

  var cellWidth = width/NUM_OF_TILES;
  var cellHeight = height/NUM_OF_TILES;
  var cellNum = 0;
  var imgNum;
  var containShip;
  if (!fromJson) {
    for (var y = 0; y < NUM_OF_TILES; y++) { //////////////////////////////////////////////////////////// <-----------------
        for (var x = 0; x < NUM_OF_TILES; x++) {
          cellNum++;
          color = '#CCCCCC';
          cell = new Shape(x*cellWidth,y*cellHeight,cellWidth, cellHeight, color, true)
          cell.draw(ctx, false);
          cells[cellNum-1] = cell; // -1 from variable i so that it can be 0 indexed
        }
    }
  }
  else {
    for (var y = 0; y < NUM_OF_TILES; y++) { //////////////////////////////////////////////////////////// <-----------------
      for (var x = 0; x < NUM_OF_TILES; x++) {
        containShip = false;
        cellNum++;
        color = '#CCCCCC';
        cell = new Shape(x*cellWidth,y*cellHeight,cellWidth, cellHeight, color, true);
        for (var i = 0; i < gameState.players[0].ships.length; i++) {
          for (var j = 0; j < gameState.players[0].ships[i].cells.length; j++) {
            if (/*gameState.players[0].ships[0].cells[0].is_hit &&*/ gameState.players[0].ships[i].cells[j].position == cellNum-1) { // -1 so it's zero indexed
            containShip = true;
            if (j == 0) {
              imgNum = 1;
            }
            else if (j == gameState.players[0].ships[i].cells.length-1) {
              imgNum = 3;
            }
            else {
              imgNum = 2;
            }
            console.log(imgNum)  
            cell.setImage("../images/" + gameState.players[0].ships[i].type + "/battle" + gameState.players[0].ships[i].type + imgNum + gameState.players[0].ships[i].direction + ".png");
              cell.draw(ctx, true);
              cells[cellNum-1] = cell;
            }
          }
        }
        if (!containShip) {
          cell.draw(ctx, false);
          cells[cellNum-1] = cell;
        }
        
      }
    } 
  } 
}

function shipSelection(width, height, id) {
    ctx = grids.item(id).getContext('2d');
    ctx.clearRect(0, 0, cvsWidth, cvsHeight);
    // ctx.rect(100, 100, 100, 100);
    //ctx.stroke();
}

function placeShips() {
    drawGrid(300, 300, 0);
    shipSelection(500, 500, 1);
}

function redrawGrid(resizing) {

  leftLength = Math.floor(wordsToGuess[currentShip].length/2);
  rightLength = Math.ceil(wordsToGuess[currentShip].length/2 -1);
  ocCells = getOccupiedCells();

  //Draws all the cells as blue with a black outline.
  for (var i = 0; i < cells.length; i++) 
  {
    cells[i].setColor('#CCCCCC');
    cells[i].draw(plGridCtx, false);
  }

  //Draws the ships on all occupied cells.
  for (var i = 0; i < cells.length; i++) {
    if (currentShip != 0) {
      for (var j = 0; j < ocCells.length; j++) {
        if (ocCells[j] == i) {
          cells[i].draw(plGridCtx, true);
        }
      }
    }
  }

  for (var i = 0; i < cells.length-1; i++) 
  {
    function isFirstCell() {if (i == 0 && cells[i].contains(mouse.x, mouse.y)) {return true;} else {return false;}}

    if (!resizing) {
     /* for (var j = 1; j < leftLength+1; j++) {
        if (isFirstCell() || (0 == i % NUM_OF_TILES && cells[i+j].contains(mouse.x, mouse.y))) {
          currentCell = i;
          console.log("WHHHHHHHHHHHHHHHHHHHHHHHHHHYHYY")
          drawShip(currentCell, isFirstCell(), leftLength);
          return;
        }
      } */
      if (isFirstCell() || cells[i+leftLength].contains(mouse.x, mouse.y)) { // checks one ahead of the current iteration - so that the mouse is in the center
        //cells[i].setColor('#555555');
        currentCell = i;

        drawShip(currentCell, isFirstCell(), leftLength);
        return;
      }
    }
    else {
      drawShip(currentCell, isFirstCell(), leftLength);
      return;
    }
  }
}

function drawShip(i, isFirst, leftLength) {
  var dif = 0;
   if (horizontal) {
    var columnNumber = (i+leftLength)%10;
      if (columnNumber<leftLength) {i += leftLength-columnNumber;}
      if (columnNumber>NUM_OF_TILES-1-rightLength) {i -= rightLength +(columnNumber - (NUM_OF_TILES-1));}
    } 
    else {
      console.log("goooba");
      dif = NUM_OF_TILES-1;
      var rowNumber = Math.floor((i+leftLength)/10); 
      var topRowNumber = (((NUM_OF_TILES-1) - rowNumber)-((NUM_OF_TILES-1) - leftLength));
      var bottomRowNumber = rowNumber-((NUM_OF_TILES-1) - leftLength);
      console.log("rowNum:" + bottomRowNumber) //(dif*(((NUM_OF_TILES-1) - rowNumber)-((NUM_OF_TILES-1) - leftLength))));
      if (rowNumber < leftLength) {
         offset = isFirst?0:topRowNumber; //adds topRowNumber unless it's the first cell.
         i += (dif*(topRowNumber)+offset);
      }
      if (rowNumber > NUM_OF_TILES-1-rightLength) {
        offset = isFirst?0:bottomRowNumber;
        i -= (dif*(bottomRowNumber)+offset);
      }
      //if (columnNumber>NUM_OF_TILES-1-rightLength) {i -= rightLength +(columnNumber - (NUM_OF_TILES-1))}
      //offset = isFirst?0:1; //adds one unless it's the first cell.
      //i = i+dif+offset; 
    }
  /*if (horizontal) {
    if ((i+leftLength)-rowNum < leftLength) // checks if the cell 3 away from "i" is equal to a division of ten, so the ship will not split when it is near the edge of the canvas.
    {
      console.log(i-rowNum);
      i = i+(i-rowNum);
    }
    if (NUM_OF_TILES-1 == i % NUM_OF_TILES-1) // checks if i is equal to a division of ten, meaning it is at the edge of the grid.
    { 
      console.log("booga doo");
      i = i+1
    }
  } 
  else {
    console.log("WWWWAAA")
    dif = NUM_OF_TILES-1;
    if (i < dif) {
      offset = isFirst?0:1; //adds one unless it's the first cell.
      i = i+dif+offset; 
    }
    if (i+Math.floor(i+wordsToGuess[currentShip].length) > NUM_OF_TILES*9) 
    { 
      i = i-dif-1;
    }
  } */

/////////////////////////////////////////////////////////////////////////////

  var skip;
  var index;
  var imgNum;
  var verticalI = i-(dif*leftLength);
  console.log(verticalI)
  for (var j = 0; j < wordsToGuess[currentShip].length; j++) {
    
    if (horizontal) {
      index = i+j;
    }
    else {
      index = verticalI+j;
      verticalI += dif;
    }

    for (var q = 0; q < ocCells.length; q++) {
      if (ocCells[q] == (index)) {
        skip = true;
      }
    }

    if (!skip) {
      //console.log(cells[index])
      if (j == 0) {
        imgNum = 1;
      }
      else if (j == wordsToGuess[currentShip].length-1) {
        imgNum = 3;
      }
      else {
        imgNum = 2;
      }
      cells[index].setImage('../images/' +  shipImages[currentShip] +'/battle' + shipImages[currentShip] + imgNum + directions[shipDirection] + ".png");
      cells[index+1].setImage('../images/' +  shipImages[currentShip] +'/battle' + shipImages[currentShip] + imgNum + directions[shipDirection] + ".png");
      cells[index].draw(plGridCtx, true);
      cells[index+1].draw(plGridCtx, true);
    }
    currentShipLocation[j] = index;
    //console.log(i);
    skip = false;
  }
}
  /*for (var j = 0; j < ocCells.length; j++) {
    if (ocCells[j] == i) {
      skip = true;
    }
  }
  if (!skip) {
    cells[i].setImage('../images/ship.png');           
    cells[i].draw(plGridCtx, true);
  }
  currentShipLocation[1] = i;
  i++;
  skip = false;
  for (var j = 0; j < ocCells.length; j++) {
    if (ocCells[j] == (i+dif)) {
      skip = true;
    }
  }
  if (!skip) {
    cells[i+dif].setImage('../images/sub.png');
    cells[i+dif].draw(plGridCtx, true);
  }
  currentShipLocation[2] = i+dif;
}*/


////////////////////////////////////////////////////

function getOccupiedCells() {
  occupiedCells = [];
    for (var j = 0; j < placedShips.length; j++) {
      for (var q = 0; q < placedShips[j].length; q++) {
        occupiedCells.push(placedShips[j][q]);
      }
    }
  var occupiedCellsCopy = occupiedCells.slice(); //copies the array - creates a unique array.
  return occupiedCellsCopy; 
}