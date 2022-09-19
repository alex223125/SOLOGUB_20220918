# frozen_string_literal: true

class Video < ApplicationRecord
  belongs_to :category

  has_one_attached :clip, dependent: :destroy
  has_one_attached :thumbnail, dependent: :destroy

  THUMBNAIL_SIZES = {
    small: [64, 64],
    medium: [128, 128],
    large: [256, 256]
  }.freeze

  after_commit :process_thumbnail_variants

  def process_thumbnail_variants
    Videos::ProcessThumbnailWorker.perform_async(id)
  end

  def sized_thumbnail(size)
    width, height = THUMBNAIL_SIZES[size]
    thumbnail&.variant(resize_to_limit: [width, height])
  end
end
