class AddIsValidToVideos < ActiveRecord::Migration[7.0]
  def change
    add_column :videos, :is_valid, :boolean
  end
end
