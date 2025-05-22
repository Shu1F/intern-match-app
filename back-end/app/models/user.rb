class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  enum :role, { student: 0, company: 1 }
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: JwtDenylist

  has_one :intern_profile, dependent: :destroy
  accepts_nested_attributes_for :intern_profile

  has_one :company_profile, dependent: :destroy
  accepts_nested_attributes_for :company_profile

  has_many :sent_messages,
            class_name: "Message",
            foreign_key: :sender_id,
            dependent: :destroy

  has_many :received_messages,
            class_name: "Message",
            foreign_key: :receiver_id,
            dependent: :destroy
end
