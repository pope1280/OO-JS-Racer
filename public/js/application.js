// Player related functions //

function Player(name, track) {
  this.name     = name;
  this.track    = track;
  this.domTrack = $(track);
  this.position = 1;
}

Player.prototype.advance = function() {
  this.position += 1;

  this.domTrack.find("td").removeClass("active");
  this.domTrack.find("td:nth-child("+this.position+")").addClass("active");
};


Player.prototype.toJson = function() {
  return {
    name: this.name
  };
};


// Game related functions //

function Game(player1, player2) {
  this.player1     = player1;
  this.player2     = player2;
  this.trackLength = 20;
}

Game.prototype.winner = function() {
  if (this.player1.position === this.trackLength) {
    return this.player1;
  } else if (this.player2.position === this.trackLength) {
    return this.player2;
  }
  return false;
};


Game.prototype.finish = function() {

  this.gameTime = ( new Date().getTime() - this.startTime ) / 1000;


  if (this.winner().name === this.player1.name) {
    this.winner = this.player1;
    this.loser = this.player2;
  } else {
    this.winner = this.player2;
    this.loser = this.player1;
  }

  $(this).trigger('gameOver');

  alert(this.winner.name + ' wins!!  Race time: '+this.gameTime+' seconds');

  $.ajax({
    url: '/endgame',
    type: 'post',
    dataType: 'json',
    data: this.toJson()
  }).done(function(data){
    window.location.href = data.redirect;
  });
};

Game.prototype.toJson = function() {
  return {
    time: this.gameTime,
    winner: this.winner.toJson(),
    loser: this.loser.toJson()
  };
};


Game.prototype.headLine = function() {
  return "" + this.player1.name+" vs. "+this.player2.name;
};

Game.prototype.start = function() {
  this.startTime = new Date().getTime();
};

Game.prototype.handleInput = function(keyCode) {
  if (this.winner()) {
    this.finish();
    return;
  }

  if (keyCode === "Q".charCodeAt(0)){
    this.player1.advance();
  } else if (keyCode === "P".charCodeAt(0)){
    this.player2.advance();
  }
};


// Race setup and "keyboard input" listener //

$(document).ready(function() {
  var game;

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

      var player1 = new Player(data.player1, '.player1_strip');
      var player2 = new Player(data.player2, '.player2_strip');
      game = new Game(player1, player2);

      showBoard();
      $(document).on('keyup', handleGameInput);   // to prevent console errors if user presses key beofre ajax call is complete
      $(document).on('keyup', startGame);

      $(game).on('gameOver', function() {
        $(document).off("keyup", handleGameInput);
      });
    });
  });


  function showBoard() {
    $('#login').slideUp("slow");
    $('.race_track').find('h1').text(game.headLine());

    setTimeout(function() {
      $('.race_track').slideDown("slow");
    }, 1500);
  }

  function startGame() {
    game.start();
    $(document).off('keyup', startGame);
  }

  function handleGameInput(e) {
    game.handleInput(e.keyCode);
  }
});

