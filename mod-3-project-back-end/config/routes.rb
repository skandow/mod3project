Rails.application.routes.draw do
  resources :users
  resources :daily_logs
  resources :events
  post 'users/search', action: :search, controller: 'users'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
