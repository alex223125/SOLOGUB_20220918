# frozen_string_literal: true

module Api
  module V1
    class VideoSerializer < ActiveModel::Serializer
      attributes :id, :title, :clip, :thumbnail, :category_id, :is_valid,
                 :error_reason, :is_processed

      THUMBNAIL_SIZE = [256, 256]

      include Rails.application.routes.url_helpers

      def thumbnail
        if object.thumbnail.variable? && object.thumbnail.attached?
          variant = object.thumbnail.variant(resize_to_limit: THUMBNAIL_SIZE).processed
          rails_blob_url(variant, host: ENV['APPLICATION_HOST'])
        end
      end

      def clip
        rails_blob_url(object.clip, host: ENV['APPLICATION_HOST']) if object.clip.attached?
      end
    end
  end
end
