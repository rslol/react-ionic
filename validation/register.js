const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegistration(data) {
    let err = {};
    let { userName, email, password } = data; 

    userName = !isEmpty(userName) ? userName : '';
    email = !isEmpty(email) ? email : '';
    password = !isEmpty(password) ? password : '';

    if (validator.isEmpty(userName)) {
        err.userName = "Username is Required";
    }

    if (validator.isEmpty(email)) {
        err.email = "Email is Required";
    }

    if (validator.isEmpty(password)) {
        err.password = "Password is Required";
    }

    if (!validator.isLength(userName, { min: 2, max: 15 })) {
        err.userName = "Username must be between 2 to 15 characters";

    }

    if (!validator.isEmail(email)) {
        err.email = "Valid Email is Required";
    }

    if (!validator.isLength(password, { min: 4, max: 30 })) {
        err.password = "Password must be between 4 and 30 characters";
    }

    return { 
        err, 
        isValid: isEmpty(err)
    }
}