const {ErrorHandler} = require('../utils/errorHandler');

const errorHandlerMiddleware = (err, req, res, next) => {
    if(err instanceof ErrorHandler) {
        return res.status(err.statusCode).json({success: false, message: err.message});
    }
    //wrong momgodb property error
    if(err.name === 'CastError'){
        return res.status(400).json({success: false, message: `resource not found, Invalid: ${err.path}`});
    }

    return res.status(500).json({success: false, message: err.message});
}

module.exports = errorHandlerMiddleware;
