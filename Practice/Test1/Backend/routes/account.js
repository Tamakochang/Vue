const router = require('express').Router();
const {check, validationResult} = require('express-validator/check')
const {onRegister, onLogin} = require('../services/account');
const { authenticated } = require('../configs/security');

// For register page
router.post('/register', [
    check('username', 'Please fill username').not().isEmpty(),
    check('password', 'Please fill password').not().isEmpty(),
    check('firstname', 'Please fill firstname').not().isEmpty(),
    check('lastname', 'Please fill lastname').not().isEmpty()
], async function(request, response){
    try {
        request.validate();
        const created = await onRegister(request.body);
        response.json(created);
    } catch (ex) {
        response.error(ex);
    }
});

// For Login
router.post('/login', [
    check('username', 'Please fill username').not().isEmpty(),
    check('password', 'Please fill password').not().isEmpty()
],async function(request, response){
    try {
        request.validate();
        const userLogin = await onLogin(request.body);
        //response.json(request.session.userLogin);
        request.session.userLogin = userLogin;
        response.json(userLogin);
    } catch (ex) {
        response.error(ex);
    }
});

// Check authentication
router.post('/getUserLogin', authenticated, function(request, response) {
    try {
        response.json(request.session.userLogin);
    }
    catch (ex) { 
        response.error(ex, 401); 
    }
});

// Logout
router.post('/logout', function(request, response) {
    try {
        delete request.session.userLogin;
        response.json({ message: 'Logout' });
    }
    catch (ex) {
        response.error(ex);
    }
});

module.exports = router;