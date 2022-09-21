if Rails.env.development?
  ENV['APPLICATION_HOST'] = "http://localhost:3000"
end