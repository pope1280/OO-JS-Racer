class CreateGamesPlayers < ActiveRecord::Migration
  def change
    create_table :games_players do |t|
      t.integer :game_id, :player_id
    end
  end
end
