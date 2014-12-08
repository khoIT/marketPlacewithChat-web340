class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :name
      t.string :category
      t.belongs_to :user
      t.decimal :price
      t.string :img_url
      t.timestamps      
    end
  end
end
