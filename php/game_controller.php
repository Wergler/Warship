<?php
if(isset($_POST['update'])){
        $error = "";
        $db = mysqli_connect('localhost','klcrigler','warchild66','MedRounds') or die ("could not connect to database");

        $json = mysqli_real_escape_string($_POST['json']);
        $query = "INSERT INTO battleship_game (json) VALUES ('$json')";

        $result = mysqli_query($db, $query) or die($query);
        mysqli_close($db);
}

if(isset($_POST['json'])){
  // This PHP script must be in "SOME_PATH/jsonFile/index.php"

  $file = '../json/game_state.json';

  if($_SERVER['REQUEST_METHOD'] === 'POST')
  // or if(!empty($_POST))
  {
  file_put_contents($file, $_POST["json"]);
  //may be some error handeling if you want
  }
  else if($_SERVER['REQUEST_METHOD'] === 'GET')
  // or else if(!empty($_GET))
  {
  echo file_get_contents($file);
  //may be some error handeling if you want
  }
}