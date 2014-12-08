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
p1 = Product.create(name: 'Disc', category: 'Electronic', user_id: 1, price: 10.05, img_url:"https://media.getchute.com/m/UR5evlevc/c/2500342/fit/450x300")
p2 = Product.create(name: 'Painting', category: 'ArtsCraft', user_id: 2, price: 33.05, img_url:"https://media.getchute.com/m/UR5eufvpn/c/2500342/fit/450x300")
p3 = Product.create(name: 'Surf Board', category: 'Sport', user_id: 3, price: 120.99, img_url:"https://media.getchute.com/m/UR5ethvgj/c/2500342/fit/450x300")
p4 = Product.create(name: 'white Tank Top', category: 'Clothing', user_id: 2, price: 55.75, img_url:"https://media.getchute.com/m/UR5eszuip/c/2500342/fit/450x300")
p5 = Product.create(name: 'Painting', category: 'ArtsCraft', user_id: 1, price: 105.05, img_url:"https://media.getchute.com/m/UR5epmqog/c/2500342/fit/450x300")
p6 = Product.create(name: 'Black Glasses', category: 'Accessory', user_id: 1, price: 44.99, img_url:"https://media.getchute.com/m/UR5eqdjmp/c/2500342/fit/450x300")
p7 = Product.create(name: 'Surf Board', category: 'Accessory', user_id: 1, price: 44.99, img_url:"https://media.getchute.com/m/UR5eoyben/c/2500342/fit/450x300")
p8 = Product.create(name: 'Speedo', category: 'Accessory', user_id: 2, price: 44.99, img_url:"https://media.getchute.com/m/UR5enulna/c/2500342/fit/450x300")
p9 = Product.create(name: 'Blazer', category: 'Clothing', user_id: 2, price: 44.99, img_url:"https://media.getchute.com/m/UR5elgjzl/c/2500342/fit/450x300")
p10 = Product.create(name: 'Black Glasses', category: 'Accessory', user_id: 1, price: 44.99, img_url:"https://media.getchute.com/m/UR5eqdjmp/c/2500342/fit/450x300")
p11 = Product.create(name: 'Disc', category: 'Electronic', user_id: 1, price: 10.05, img_url:"https://media.getchute.com/m/UR5ejocak/c/2500342/fit/450x300")
p12 = Product.create(name: 'Painting', category: 'ArtsCraft', user_id: 2, price: 33.05, img_url:"https://media.getchute.com/m/UR5eiphfc/c/2500342/fit/450x300")
p13 = Product.create(name: 'Surf Board', category: 'Sport', user_id: 3, price: 120.99, img_url:"https://media.getchute.com/m/UR5ehrpgd/c/2500342/fit/450x300")
p14 = Product.create(name: 'white Tank Top', category: 'Clothing', user_id: 2, price: 55.75, img_url:"https://media.getchute.com/m/UR5egmehk/c/2500342/fit/450x300")
p15 = Product.create(name: 'Painting', category: 'ArtsCraft', user_id: 1, price: 105.05, img_url:"https://media.getchute.com/m/UR5efxmqh/c/2500342/fit/450x300")
p16 = Product.create(name: 'Black Glasses', category: 'Accessory', user_id: 1, price: 44.99, img_url:"https://media.getchute.com/m/UR5edfoub/c/2500342/fit/450x300")
p17 = Product.create(name: 'Surf Board', category: 'Accessory', user_id: 1, price: 44.99, img_url:"https://media.getchute.com/m/UR5ecdwrc/c/2500342/fit/450x300")
p18 = Product.create(name: 'Speedo', category: 'Accessory', user_id: 2, price: 44.99, img_url:"https://media.getchute.com/m/UR5ebtanq/c/2500342/fit/450x300")
p19 = Product.create(name: 'Blazer', category: 'Clothing', user_id: 2, price: 44.99, img_url:"https://media.getchute.com/m/UR5eadwxi/c/2500342/fit/450x300")
p20 = Product.create(name: 'Black Glasses', category: 'Accessory', user_id: 1, price: 44.99, img_url:"https://media.getchute.com/m/UR5e9cgxj/c/2500342/fit/450x300")
