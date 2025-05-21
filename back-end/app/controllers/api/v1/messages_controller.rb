class Api::V1::MessagesController < ApplicationController
  before_action :ensure_company!, only: [:index, :create]
  def index
    @messages = if current_user.company?
                    current_user.sent_messages.order(created_at: :desc)
                else
                  current_user.received_messages.order(created_at: :desc)
                end
    render json: @messages, status: :ok
  end

  def create
    @message = current_user.sent_messages.build(message_params)

    if @message.save
      render json: @message, status: :ok
    else 
      render json: @message.errors, status: :unprocessable_entity
    end
  end

  private
  
  def message_params
    params.require(:message).permit(:receiver_id, :body)
  end

  def ensure_company!
    unless current_user.company?
      render json: {error: 'Permission denied.'}, status: :forbidden
    end
  end
end
