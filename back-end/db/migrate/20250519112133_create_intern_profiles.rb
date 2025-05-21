class CreateInternProfiles < ActiveRecord::Migration[8.0]
  def change
    create_table :intern_profiles do |t|
      t.references :user, null: false, foreign_key: true, index: { unique: true }
      t.string :name, null: false
      t.string :university, null: false

      t.timestamps
    end
  end
end
