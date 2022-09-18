namespace :categories do
  desc "creates default categories for videos"
  task seed_categories: :environment do
    Services::Categories::Seed.new.call
  end
end
