get '/' do
  erb :index
end

post '/' do
  p params
  @player1 = Player.find_or_create_by_name(name: params[:player1])
  @player2 = Player.find_or_create_by_name(name: params[:player2])
  erb :game
end

post '/endgame' do
  content_type :json

  winner = Player.find_by_name(params[:winner])
  loser = Player.find_by_name(params[:loser])
  game = Game.create(time: params[:gametime], winner_id: winner.id)

  game.players << winner
  game.players << loser
end