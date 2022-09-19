# frozen_string_literal: true

module Services
  module Videos
    class ProcessThumbnailImage
      SIZES = %i[small medium large].freeze

      def initialize(id)
        @video = Video.find_by(id: id)
      end

      def call
        create_variants if @video.present?
      end

      private

      def create_variants
        SIZES.each do |size|
          @video.sized_thumbnail(size).process
        end
      rescue ActiveStorage::Error => e
        Rails.logger.error(e.message)
      end
    end
  end
end
