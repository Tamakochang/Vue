const router = require('express').Router();
const account = require('./account')

// Account Router
router.use('/account', account);

router.get('/', function(request, response){
    response.json({message: 'router page'});
});

module.exports = router;