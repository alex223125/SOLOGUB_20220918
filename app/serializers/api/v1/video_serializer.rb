# frozen_string_literal: true

module Api
  module V1
    class VideoSerializer < ActiveModel::Serializer
      attributes :id, :title, :clip, :thumbnail, :category_id, :is_valid,
                 :error_reason, :is_processed

      include Rails.application.routes.url_helpers

      def thumbnail
        rails_blob_url(object.thumbnail, host: ENV['APPLICATION_HOST']) if object.thumbnail.attached?
      end

      def clip
        rails_blob_url(object.clip, host: ENV['APPLICATION_HOST']) if object.clip.attached?
      end
    end
  end
end
