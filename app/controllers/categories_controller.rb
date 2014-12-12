class CategoriesController < ApplicationController
  def show_product
    @products = Product.where(category_id: params[:id])
  end
end
