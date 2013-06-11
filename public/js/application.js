function Player(name, track) {
  this.name     = name;
  this.track    = track;
  this.position = 1;
}

Player.prototype.advance = function(player) {

};


function Game(player1, player2) {
  this.player1     = player1;
  this.player2     = player2;
  this.trackLength = 20;
}

Game.prototype.advance = function(player) {
  if (this.winner(player) === true) {
    // $(document).off("keyup");   <---prevents further keypress? verify once reay to test this function
  }
  else {
    player.advance(player);
  }
};

Game.prototype.winner = function(player) {

};



Game.prototype.renderBoard = function(player1Name, player2Name) {
  $('#login').slideUp("slow");
  $('.race_track').find('h1').text(""+player1Name+" vs. "+player2Name+"");

  setTimeout(function() {
    $('.race_track').slideDown("slow");
  }, 1500);

};




$(document).ready(function() {
  var player1, player2, game;

  $('.race_track').hide();

  $('#login').on('submit', function(event){
    event.preventDefault();

    var playerNames = $(this).serialize();

    $.ajax({
      url: '/play',
      type: 'post',
      dataType: 'json',
      data: playerNames
    }).done(function(data){

      player1 = new Player(data.player1, '#player1_strip');
      player2 = new Player(data.player2, '#player2_strip');
      game    = new Game(player1, player2);

      game.renderBoard(player1.name, player2.name);
    });
  });


  $(document).on('keyup', function(e){
    if      (e.keyCode === "Q".charCodeAt(0)){
      game.advance(player1);
    }
    else if (e.keyCode === "P".charCodeAt(0)){
      game.advance(player2);
    }
  });


});







//////////// STUFF FROM JS Racer 2 is below!!!! /////////////////////


// $(document).ready(function() {
//   $(".race_track").hide();
//   $("#hidden_time").hide();
//   // var player1Position = 1;
//   // var player2Position = 1;

//   function GameOver(winner, loser, time) {
//     console.log(winner, time);
//     $.ajax({
//       url: '/endgame',
//       type: 'post',
//       data: {winner: winner, loser: loser, gametime: time},
//       dataType: "json"
//     });
//   }



//   $(this).on("keyup", function(e){

//     if (player1Position === 1 && player2Position === 1) {
//       startTime = new Date().getTime();
//     }


//     if (e.keyCode === 81) {
//       if (player2Position === 20) {}
//       else if (player1Position < 19) {
//         player1Position++;
//         $(".player1_strip").find("td").removeClass("active");
//         $(".player1_strip").find("td:nth-child("+player1Position+")").addClass("active");
//       }
//       else {
//         // winner
//         player1Position++;
//         $(".player1_strip").find("td").removeClass("active");
//         $(".player1_strip").find("td:nth-child("+player1Position+")").addClass("active");
//         $(this).off("keyup");
//         endTime = new Date().getTime();
//         winner = $(".player1_strip").attr("value");
//         loser = $(".player2_strip").attr("value");
//         $("#hidden_name").text("Player 1 Wins!").show();
//         $("#hidden_time").text("Game Time: "+(endTime - startTime)+"").show();
//         GameOver(winner, loser, (endTime - startTime));
//       }

//     }

//     else if (e.keyCode === 80){
//       //advance player 2
//       if (player1Position === 20) {}
//       else if (player2Position < 19) {
//         player2Position++;
//         $(".player2_strip").find("td").removeClass("active");
//         $(".player2_strip").find("td:nth-child("+player2Position+")").addClass("active");
//       }
//       else {
//         // winner
//         player2Position++;
//         $(".player2_strip").find("td").removeClass("active");
//         $(".player2_strip").find("td:nth-child("+player2Position+")").addClass("active");
//         $(this).off("keyup");
//         endTime = new Date().getTime();
//         winner = $(".player2_strip").attr("value");
//         loser = $(".player1_strip").attr("value");
//         $("#hidden_name").text("Player 2 Wins!").show();
//         $("#hidden_time").text("Game Time: "+(endTime - startTime)+"").show();
//         GameOver(winner, loser, (endTime - startTime));
//       }
//     }
//   });
// });
