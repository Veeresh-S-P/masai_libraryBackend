const {Router}=require("express");
const bookRoute=Router()
const {auth}=require("../middlewares/auth.middleware")
const {verifyrole}=require("../middlewares/verifyrole.middleware");
const {addBook,editBook,deleteBook,getBook,getOneBook}=require("../controllers/book.controller")

bookRoute.post("/books",auth,verifyrole([true]),addBook)
bookRoute.patch("/books/:id",auth,verifyrole([true]),editBook)
bookRoute.delete("/books/:id",auth,verifyrole([true]),deleteBook)
bookRoute.get("/books",auth,getBook)
bookRoute.get("/books/:id",auth,getOneBook)


module.exports={bookRoute}