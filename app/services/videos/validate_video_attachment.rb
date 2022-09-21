# frozen_string_literal: true

module Services
  module Videos
    class ValidateVideoAttachment
      MAX_FILE_SIZE_MEGABYTES = 10
      ALLOWED_FORMATS = %w[mov mp4].freeze

      def initialize(id)
        @video = Video.find_by(id: id)
      end

      def call
        set_clip
        set_flags
        process
      end

      private

      def process
        if @format_flag && @file_size_flag
          @video.is_valid = true
        else
          @video.is_valid = false
          @video.error_reason = error_reason
        end
        mark_as_processed
        @video.save!
      end

      def set_flags
        @format_flag = valid_format?
        @file_size_flag = valid_file_size?
      end

      def mark_as_processed
        @video.is_processed = true
      end

      def error_reason
        reason = ''
        unless @format_flag
          reason = (reason + "Not supported format, supported formats are: #{ALLOWED_FORMATS.join(',')}; ")
        end
        unless @file_size_flag
          reason = (reason + "File size should be not more then: #{MAX_FILE_SIZE_MEGABYTES} megabytes; ")
        end
        reason
      end

      def valid_format?
        clip_file_format.any? { |file_format| ALLOWED_FORMATS.include?(file_format) }
      end

      def valid_file_size?
        size_in_megabytes <= MAX_FILE_SIZE_MEGABYTES
      end

      def set_clip
        @video.clip.open(tmpdir: '/tmp') do |file|
          @clip = FFMPEG::Movie.new(file.path)
        end
      end

      def size_in_megabytes
        @clip.metadata[:format][:size].to_f / 1_000_000
      end

      def clip_file_format
        @clip.container.split(',')
      end
    end
  end
end
