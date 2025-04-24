const express=require('express');
const router=express.Router();
const {handlebookrequest,handlesearchrequest,handlegetrequest}=require('../controller/books.js');
const {handleRentRequest}=require('../controller/rent.js');
const { handleupdate, handledelete } = require('../controller/reviews.js');

router.route('/')
.get(handlebookrequest);

router.route('/search')
.get(handlesearchrequest);

router.route('/:id')
.get(handlegetrequest);

router.route('/rent/:id')
.patch(handleRentRequest);

router.route("/")
  .patch(handleupdate)
  .delete(handledelete);



module.exports=router;
