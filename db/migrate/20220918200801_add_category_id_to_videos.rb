class AddCategoryIdToVideos < ActiveRecord::Migration[7.0]
  def change
    add_column :videos, :category_id, :integer
  end
end
