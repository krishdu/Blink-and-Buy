/**
 * @description accept an async function to handle any promise error
 * @param  {} fn
 */
const asyncWrapper  = (fn) => {
    return async(req, res, next) => {
        try{
            await fn(req, res, next);
        }catch(error){
            next(error);
        }
    }
}

module.exports = asyncWrapper;