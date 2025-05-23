class Message < ApplicationRecord
  belongs_to :sender, class_name: "User"
  belongs_to :receiver, class_name: "User"

  validates :body, presence: true, length: { maximum: 1000 }

  validate :sender_must_be_company
  validate :receiver_must_be_student

  private

  def sender_must_be_company
    unless sender&.company?
      errors.add(:sender, "must be company")
    end
  end

  def receiver_must_be_student
    unless receiver&.student?
      errors.add(:receiver, "must be student")
    end
  end
end
