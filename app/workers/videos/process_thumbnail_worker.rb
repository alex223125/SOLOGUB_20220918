# frozen_string_literal: true

module Videos
  class ProcessThumbnailWorker
    include Sidekiq::Worker
    sidekiq_options retry: false

    def perform(id)
      Services::Videos::ProcessThumbnailImage.new(id).call
    end
  end
end
