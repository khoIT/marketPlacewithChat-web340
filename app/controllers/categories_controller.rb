class CategoriesController < ApplicationController
  def show_product
    @products = Product.where(category_id: params["_json"])
    render json: @products
  end

end
