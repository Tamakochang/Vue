const {check, validationResult} = require('express-validator/check')

module.exports = function(request, response, next) {
    request.validate = function() {
        const errors = validationResult(request).array();
        if(errors.length == 0) return;
        throw new Error(`${errors[0].msg}`);
    };
    response.error = function(ex, status = 400){
        response.status(status).json({message: ex.message});
    };
    next();
}