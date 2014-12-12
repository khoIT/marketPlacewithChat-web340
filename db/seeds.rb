# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
u1 = User.create(name: 'Khoi', password:'123!@#ab', email: 'khoitran_2014@depauw.edu')
u2 = User.create(name: 'Rajat', password:'123!@#ab', email: 'rajatkumar_2015@depauw.edu')
u3 = User.create(name: 'Yuki', password:'123!@#ab', email: 'yukinakano_2014@depauw.edu')
u3 = User.create(name: 'Khoi', password:'123!@#ab', email: 'emails.khoi@gmail.com')
c1 = Category.create(name: 'Arts & Crafts');
c2 = Category.create(name: 'Bikes');
c3 = Category.create(name: 'Books');
c4 = Category.create(name: 'Cars');
c5 = Category.create(name: 'Clothing');
c6 = Category.create(name: 'Electronics');
c7 = Category.create(name: 'Household');
c8 = Category.create(name: 'Tickets');
c9 = Category.create(name: 'Toys & Games');
c10 = Category.create(name: 'General');
p1 = Product.create(name: 'Disc', category_id: 1, user_id: 1, price: 10.05, view: 0, img_url:"https://media.getchute.com/m/UR5evlevc/c/2500342/fit/450x300")
p2 = Product.create(name: 'Painting', category_id:2, user_id: 2, price: 33.05, view: 0, img_url:"https://media.getchute.com/m/UR5eufvpn/c/2500342/fit/450x300")
p3 = Product.create(name: 'Surf Board', category_id:3, user_id: 3, price: 120.99, view: 0, img_url:"https://media.getchute.com/m/UR5ethvgj/c/2500342/fit/450x300")
p4 = Product.create(name: 'white Tank Top', category_id:4, user_id: 2, price: 55.75, view: 0, img_url:"https://media.getchute.com/m/UR5eszuip/c/2500342/fit/450x300")
p5 = Product.create(name: 'Painting', category_id:5, user_id: 1, price: 105.05, view: 0, img_url:"https://media.getchute.com/m/UR5epmqog/c/2500342/fit/450x300")
p6 = Product.create(name: 'Black Glasses', category_id:6, user_id: 1, price: 44.99, view: 0, img_url:"https://media.getchute.com/m/UR5eqdjmp/c/2500342/fit/450x300")
p7 = Product.create(name: 'Surf Board', category_id:7, user_id: 1, price: 44.99, view: 0, img_url:"https://media.getchute.com/m/UR5eoyben/c/2500342/fit/450x300")
p8 = Product.create(name: 'Speedo', category_id:8, user_id: 2, price: 44.99, view: 0, img_url:"https://media.getchute.com/m/UR5enulna/c/2500342/fit/450x300")
p9 = Product.create(name: 'Blazer', category_id:9, user_id: 2, price: 44.99, view: 0, img_url:"https://media.getchute.com/m/UR5elgjzl/c/2500342/fit/450x300")
p10 = Product.create(name: 'Black Glasses', category_id:10, user_id: 1, price: 44.99, view: 0, img_url:"https://media.getchute.com/m/UR5eqdjmp/c/2500342/fit/450x300")
p11 = Product.create(name: 'Disc', category_id:1, user_id: 1, price: 10.05, view: 0, img_url:"https://media.getchute.com/m/UR5ejocak/c/2500342/fit/450x300")
p12 = Product.create(name: 'Painting', category_id:2, user_id: 2, price: 33.05, view: 0, img_url:"https://media.getchute.com/m/UR5eiphfc/c/2500342/fit/450x300")
p13 = Product.create(name: 'Surf Board', category_id:3, user_id: 3, price: 120.99, view: 0, img_url:"https://media.getchute.com/m/UR5ehrpgd/c/2500342/fit/450x300")
p14 = Product.create(name: 'white Tank Top', category_id:4, user_id: 2, price: 55.75, view: 0, img_url:"https://media.getchute.com/m/UR5egmehk/c/2500342/fit/450x300")
p15 = Product.create(name: 'Painting', category_id:5, user_id: 1, price: 105.05, view: 0, img_url:"https://media.getchute.com/m/UR5efxmqh/c/2500342/fit/450x300")
p16 = Product.create(name: 'Black Glasses', category_id:6, user_id: 1, price: 44.99, view: 0, img_url:"https://media.getchute.com/m/UR5edfoub/c/2500342/fit/450x300")
p17 = Product.create(name: 'Surf Board', category_id:7, user_id: 1, price: 44.99, view: 0, img_url:"https://media.getchute.com/m/UR5ecdwrc/c/2500342/fit/450x300")
p18 = Product.create(name: 'Speedo', category_id:8, user_id: 2, price: 44.99, view: 0, img_url:"https://media.getchute.com/m/UR5ebtanq/c/2500342/fit/450x300")
p19 = Product.create(name: 'Blazer', category_id:9, user_id: 2, price: 44.99, view: 0, img_url:"https://media.getchute.com/m/UR5eadwxi/c/2500342/fit/450x300")
p20 = Product.create(name: 'Black Glasses', category_id:10, user_id: 1, price: 44.99, view: 0, img_url:"https://media.getchute.com/m/UR5e9cgxj/c/2500342/fit/450x300")
