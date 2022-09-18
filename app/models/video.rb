# frozen_string_literal: true

class Video < ApplicationRecord
  belongs_to :category

  has_one_attached :clip
  has_one_attached :thumbnail
end
