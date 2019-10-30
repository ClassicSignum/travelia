var exprss=require('express');
var traveliaModel=require('../../models/travelia-model');
var router= exprss.Router();

router.get('/',function(request,response){

   

        response.render('travelia/index');
    
});




module.exports = router;