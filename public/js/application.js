$(document).ready(function() {
  $("#hidden_name").hide();
  $("#hidden_time").hide();
  var player1Position = 1;
  var player2Position = 1;

  function GameOver(winner, loser, time) {
    console.log(winner, time);
    $.ajax({
      url: '/endgame',
      type: 'post',
      data: {winner: winner, loser: loser, gametime: time},
      dataType: "json"
    });
  }



  $(this).on("keyup", function(e){

    if (player1Position === 1 && player2Position === 1) {
      startTime = new Date().getTime();
    }


    if (e.keyCode === 81) {
      if (player2Position === 20) {}
      else if (player1Position < 19) {
        player1Position++;
        $(".player1_strip").find("td").removeClass("active");
        $(".player1_strip").find("td:nth-child("+player1Position+")").addClass("active");
      }
      else {
        // winner
        player1Position++;
        $(".player1_strip").find("td").removeClass("active");
        $(".player1_strip").find("td:nth-child("+player1Position+")").addClass("active");
        $(this).off("keyup");
        endTime = new Date().getTime();
        winner = $(".player1_strip").attr("value");
        loser = $(".player2_strip").attr("value");
        $("#hidden_name").text("Player 1 Wins!").show();
        $("#hidden_time").text("Game Time: "+(endTime - startTime)+"").show();
        GameOver(winner, loser, (endTime - startTime));
      }

    }

    else if (e.keyCode === 80){
      //advance player 2
      if (player1Position === 20) {}
      else if (player2Position < 19) {
        player2Position++;
        $(".player2_strip").find("td").removeClass("active");
        $(".player2_strip").find("td:nth-child("+player2Position+")").addClass("active");
      }
      else {
        // winner
        player2Position++;
        $(".player2_strip").find("td").removeClass("active");
        $(".player2_strip").find("td:nth-child("+player2Position+")").addClass("active");
        $(this).off("keyup");
        endTime = new Date().getTime();
        winner = $(".player2_strip").attr("value");
        loser = $(".player1_strip").attr("value");
        $("#hidden_name").text("Player 2 Wins!").show();
        $("#hidden_time").text("Game Time: "+(endTime - startTime)+"").show();
        GameOver(winner, loser, (endTime - startTime));
      }
    }
  });
});
