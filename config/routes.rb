Rails.application.routes.draw do
  resources :videos
  resources :categories
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "videos#index"

  require 'sidekiq/web'
  Rails.application.routes.draw do
    mount Sidekiq::Web => '/sidekiq'
  end

  namespace :api do
    namespace :v1 do
      get 'videos/index'
      post 'videos/', to: 'videos#create'
      delete 'videos/:id', to: 'videos#destroy'
    end
  end

end
