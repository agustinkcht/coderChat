function errorHandler(error, _req, res, _next) {
    console.log(error)
    return res.json({
        statusCode: error.statusCode || 500,
        message: error.message || 'API Error'
    });
};
//error es el err que estoy generando

export default errorHandler;