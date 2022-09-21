# frozen_string_literal: true

module Api
  module V1
    class VideosController < ApplicationController
      protect_from_forgery with: :null_session

      before_action :set_video, only: %i[destroy]
      before_action :set_categroy, only: [:create]

      def index
        @videos = Video.all.order(title: :asc)
        render json: @videos, each_serializer: Api::V1::VideoSerializer
      end

      def create
        @video = Video.new(video_params)
        @video.category = @category

        if @video.save
          render json: @video
        else
          render json: @video.errors
        end
      end

      def destroy
        @video.destroy
      end

      private

      def set_video
        @video = Video.find(params[:id])
      end

      def video_params
        params.permit(:title, :clip, :thumbnail)
      end

      def set_categroy
        @category = Category.where(title: params[:category]).first
      end
    end
  end
end
