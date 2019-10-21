var exprss=require('express');

var router= exprss.Router();

router.get('/',function(request,response){
    response.render('admin/index');
});

module.exports = router;