class Api::V1::InternProfilesController < ApplicationController
  before_action :set_Intern_Profile, only: [:show, :update]
  before_action :ensure_company!, only: [:index]
  before_action :ensure_student!, only: [:update, :create]

  def index
    @profiles = InternProfile.all
    render json: @profiles, status: :ok
  end  
  
  def show
    render json: @profile, status: :ok
  end

  def create
    @profile = InternProfile.new(profile_params)

    if @profile.save
      render json: @profile, status: :ok
    else 
      render json: @profile.errors, status: :unprocessable_entity
    end
  end

  def update
    if @profile.update(profile_params)
      render json: @profile, status: :ok
    else
      render json: @profile.errors, status: :unprocessable_entity
    end
  end

  private

  def set_Intern_Profile
    @profile = InternProfile.find(params[:id])
  end

  def ensure_company!
    unless current_user.company?
      render json: {error: 'Permission denied.'}, status: :forbidden
    end
  end

  def ensure_student!
    unless current_user.student?
      render json: {error: 'Permission denied.'}, status: :forbidden
    end
  end

  def profile_params
    params.require(:intern_profile).permit(:name, :university)
  end
end
