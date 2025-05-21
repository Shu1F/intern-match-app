class ApplicationController < ActionController::API
  include ActionController::MimeResponds

  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [ :email, :password, :password_confirmation, :role ])
    devise_parameter_sanitizer.permit(:sign_in, keys: [ :email, :password ])
    devise_parameter_sanitizer.permit(:account_update, keys: [ :password, :password_confirmation ])
  end
end
