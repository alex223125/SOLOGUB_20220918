class AddIsProcessedToVideos < ActiveRecord::Migration[7.0]
  def change
    add_column :videos, :is_processed, :boolean, default: false
  end
end
