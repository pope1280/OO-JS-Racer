get '/' do
  erb :index
end

post '/play' do
  content_type :json

  player1 = Player.find_or_create_by_name(params[:player1])
  player2 = Player.find_or_create_by_name(params[:player2])

  {player1: player1.name, player2: player2.name}.to_json
end

post '/endgame' do
  content_type :json

  winner = Player.find_by_name(params[:winner])
  loser = Player.find_by_name(params[:loser])
  game = Game.create(time: params[:gametime], winner_id: winner.id)

  game.players << winner
  game.players << loser
end
