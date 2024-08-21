var bk;
var pl;
//
const NUM_OF_SHIPS = 5;
const NUM_OF_TILES = 10; 
//
var plGrid = document.getElementById('grid-player');
var plGridCtx = plGrid.getContext("2d");
var opGrid = document.getElementById('grid-opponent');
var opGridCtx = opGrid.getContext("2d");
gridDrawn = false;
var mouse;
//
var gameStart = false;
var gameState;
//
var grids = document.querySelectorAll(".grid");
var ctx;
var cvsWidth = grids.item(0).width;
var cvsHeight = grids.item(0).height;
var currentCell = null;
var horizontal = true;
var ocCells;
//
var cells = [];
var currentShip = 0;
var currentShipLocation = [];
var placedShips = [];
//
var gameSet = false;
var jsonSet;
var directions = ["left","up","right","down"];
var shipDirection = 0;
var isFirst;
var wordsToGuess = [];
var shipImages = ["carrier","ship","destroyer","sub","cruiser"]; //add ship image names
// Ship Variables 
var leftLength;
var rightLength;
var shipDirections = [];

