const {ErrorHandler} = require('../utils/errorHandler');

const errorHandlerMiddleware = (err, req, res, next) => {
    if(err instanceof ErrorHandler) {
        return res.status(err.statusCode).json({success: false, message: err.message});
    }

    return res.status(500).json({success: false, message: err.message});
}

module.exports = errorHandlerMiddleware;
