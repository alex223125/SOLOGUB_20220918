class AddErrorReasonToVideos < ActiveRecord::Migration[7.0]
  def change
    add_column :videos, :error_reason, :text
  end
end
