Rails.application.routes.draw do
  devise_for :users,
    dafaults: {format: :json}, 
    controllers: {registrations: 'users/registrations',}
  namespace :api do
    namespace :v1 do
      resources :intern_profiles, only: [:index, :show, :create, :update]

      resources :messages, only: [:index, :create]
    end
  end
end
