class Users::RegistrationsController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :create ]
  respond_to :json
  def create
    @user = User.new(sign_up_params)
    if @user.save
      sign_in(@user, store: false)
      render json: { message: "Signed up successfully.", user: @user }, status: :created
    else
      render json: { message: "Sign up failure.", errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation, :role, intern_profile_attributes: [ :name, :university ])
  end
end
