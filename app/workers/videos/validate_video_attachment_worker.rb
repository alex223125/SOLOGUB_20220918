# frozen_string_literal: true

require 'sidekiq-scheduler'

module Videos
  class ValidateVideoAttachmentWorker
    include Sidekiq::Worker
    sidekiq_options retry: false

    def perform
      unprocessed_videos.each do |video|
        Services::Videos::ValidateVideoAttachment.new(video.id).call
      end
    end

    private

    def unprocessed_videos
      Video.where(is_processed: false)
    end
  end
end
