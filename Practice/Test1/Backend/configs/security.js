const crypto = require('crypto');

const security = {
    hashed_password(password) {
        return crypto.createHash('sha1').update(password).digest('hex');
    },
    authenticated(request, response, next) {
        try {
            if (request.session.userLogin) {
                return next();
            }
            throw new Error('Unauthorized');
        }
        catch (ex) {
            response.error(ex, 401);
        }
    }
};

module.exports = security;