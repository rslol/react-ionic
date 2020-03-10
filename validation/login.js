const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateLogin(data) {
    let err = {};
    let { userName, password } = data; 

    userName = !isEmpty(userName) ? userName : '';
    password = !isEmpty(password) ? password : '';

    if (validator.isEmpty(userName)) {
        err.userName = "Username is Required";
    }

    if (validator.isEmpty(password)) {
        err.password = "Password is Required";
    }

    return {
        err, 
        isValid: isEmpty(err)
    }
}