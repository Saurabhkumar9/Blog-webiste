const handleErrors = (statusCode, message) => {
    const error = new Error(message); 
    error.statusCode = statusCode;
    return error;
};

module.exports = handleErrors;
