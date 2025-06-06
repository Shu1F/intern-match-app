Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "localhost:3000"

    resource "*",
      headers: [ "Authorization", "Content-Type" ],
      expose: [ "Authorization" ],
      methods: [ :get, :post, :put, :patch, :delete, :options, :head ]
  end
end
