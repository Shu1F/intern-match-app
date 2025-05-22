class Api::V1::CompanyProfilesController < ApplicationController
  def index
    @profiles = CompanyProfile.all
    render json: @profiles, status: :ok
  end

  def show
    render json: @profile, status: :ok
  end

  def create
    @profile = CompanyProfile.new(profile_params)

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

  def set_Company_Profile
    @profile = CompanyProfile.find(params[:id])
  end

  def profile_params
    params.require(:company_profile).permit(:name, :university)
  end
end
