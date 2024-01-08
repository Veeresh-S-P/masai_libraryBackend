const {Router}=require("express");
const orderRoute=Router()
const {auth}=require("../middlewares/auth.middleware")
const {verifyrole}=require("../middlewares/verifyrole.middleware");
const {addOrder,getOrder}=require("../controllers/order.controller")

bookRoute.post("/order",auth,verifyrole([true]),addOrder)
bookRoute.get("/orders",auth,verifyrole([true]),getOrder)



module.exports={orderRoute}