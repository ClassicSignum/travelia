var exprss=require('express');
var router= exprss.Router();
var expressValidator = require('express-validator');
router.get('/adminAddCust',function(request,response){
    response.render('admin/adminAddCust');
});
router.get('/admin',function(request,response){
    response.render('admin/index');
});


router.post('/', [
    check('firstname').not().isEmpty().withMessage('Name must have more than 5 characters'),
    check('lastname').not().isEmpty().withMessage('Name must have more than 5 characters'),
    check('email', 'Your email is not valid').not().isEmpty(),
    check('address', 'Your address is not valid').not().isEmpty(),
    
    check('phoneno', '').not().isEmpty(),
    check('password', 'Your password must be at least 5 characters').not().isEmpty(),
  ],function(request,response){
    
});


module.exports = router;