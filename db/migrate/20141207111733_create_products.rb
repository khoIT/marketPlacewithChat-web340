class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :name
      t.integer :category_id
      t.belongs_to :user
      t.decimal :price
      t.string :img_url
      t.integer :view
      t.timestamps
    end
  end
end
