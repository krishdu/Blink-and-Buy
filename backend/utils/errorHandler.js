class ErrorHandler extends Error {
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}

/**
 * @description middleware function to handle error
 * @param  {} message
 * @param  {} statusCode
 * @returns ErrorHandler reference
 */
const createCustomError = (message, statusCode) => {
    return new ErrorHandler(message, statusCode);
}

module.exports = {
    createCustomError, 
    ErrorHandler
};
