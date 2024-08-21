 function Shape(x, y, w, h, fill, outline) {
        // This is a very simple and unsafe constructor. All we're doing is checking if the values exist. 
        // "x || 0" just means "if there is a value for x, use that. Otherwise use 0." 
        // But we aren't checking anything else! We could put "Lalala" for the value of x  
        this.x = x || 0;
        this.y = y || 0;
        this.w = w || 1;
        this.h = h || 1;
        this.fill = fill || '#AAAAAA';
        this.outline = outline || false;
        this.img = new Image();
        this.xPer;
        this.yPer;
    }
    Shape.prototype.draw = function(ctx, drawImage) {
      if (drawImage)
      {
        ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
      }
      else {
        //ctx.fillStyle = this.fill;
        ctx.globalAlpha = 0.0;
        ctx.fillRect(this.x, this.y, this.w, this.h);
        ctx.globalAlpha = 1.0;
      }
      if (this.outline) {
        ctx.strokeStyle = "black";
        ctx.lineWidth = 0.5
        ctx.strokeRect(this.x, this.y, this.w, this.h);
      }
    }
    Shape.prototype.setColor = function(color) {
      this.fill = color;
    }
    Shape.prototype.setImage = function(img) {
      this.img.src = img;
    }
    Shape.prototype.getImage = function() {
      console.log("PERISH YOU STUPID COMPUTER!!!!!!!!")
      return this.img.src;
    }
    Shape.prototype.contains = function(mx, my) {
        // All we have to do is make sure the Mouse X,Y fall in the area between 
        // the shape's X and (X + Width) and its Y and (Y + Height) 
        return (this.x <= mx) && (this.x + this.w >= mx) &&
            (this.y <= my) && (this.y + this.h >= my);
    }

function findPos(obj){
    var curleft = 0;
    var curtop = 0;
if (state.canvas.offsetParent) {
    do {
        curleft += obj.offsetLeft;
        curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
    
    return {X:curleft,Y:curtop};
        }
}

function getGameState() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          gameState = JSON.parse(this.responseText);
          gameSet = gameState.gameSet;
          jsonSet =  gameState.jsonSet;
          console.log("peenids");
          $(function() {
            // ...trigger the custom `jsonReady` event
            $(document).trigger('jsonready');
          });
        }
    };
    xhttp.open("GET", "..\\json\\game_state.json", true);
    xhttp.send();
}

function updateJson() {
    var data = new FormData();
    var input = JSON.stringify(gameState);
    data.append("json" , input);
    var xhr = (window.XMLHttpRequest) ? new XMLHttpRequest() : new activeXObject("Microsoft.XMLHTTP");
    xhr.open('post', 'http://localhost/battleship_game/php/game_controller.php', true);
    xhr.send(data);
    //window.location.href = 'http://localhost/test/write_to_file.php';
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;S
    }
  }
}

function getMouse(canvas, e) {
  var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;
  if (document.defaultView && document.defaultView.getComputedStyle) {
    this.stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10)      || 0;
    this.stylePaddingTop  = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10)       || 0;
    this.styleBorderLeft  = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10)  || 0;
    this.styleBorderTop   = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10)   || 0;
  }
  // Some pages have fixed-position bars (like the stumbleupon bar) at the top or left of the page
  // They will mess up mouse coordinates and this fixes that
  var html = document.body.parentNode;
  this.htmlTop = html.offsetTop;
  this.htmlLeft = html.offsetLeft;
  var element = canvas, offsetX = 0, offsetY = 0, mx, my;
  if (element.offsetParent !== undefined) {
      do {
          offsetX += element.offsetLeft;
          offsetY += element.offsetTop;
      } while ((element = element.offsetParent));
  }
  offsetX += this.stylePaddingLeft + this.styleBorderLeft + this.htmlLeft;
  offsetY += this.stylePaddingTop + this.styleBorderTop + this.htmlTop;
  mx = e.pageX - offsetX;
  my = e.pageY - offsetY;
  return { x: mx, y: my };
}

function isTouchDevice() {
  var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
  var mq = function(query) {
    return window.matchMedia(query).matches;
  }

  if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
    return true;
  }

  // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH
  var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
  return mq(query);
}

    
         


