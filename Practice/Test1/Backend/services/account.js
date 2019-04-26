const connection = require('../configs/database');
const {hashed_password} = require('../configs/security');

module.exports = {
    onRegister(value) {
        return new Promise(function(resolve, reject){
            value.password = hashed_password(value.password);
            connection.query('INSERT INTO users SET ?', value, function(error, result) {
                if(error) return reject(error);
                resolve(result);
            });
        });
    },
    onLogin(value){
        return new Promise((resolve, reject) => {
            password = hashed_password(value.password);
            connection.query('SELECT * FROM users WHERE username=? and password=?', [value.username, password], function(error, result) {
                if (error) return reject(error);
                if (result.length > 0) {
                    const userLogin = result[0];
                    return resolve(userLogin);
                } reject(new Error('Invalid username or password'));
            });
        });
    }
};