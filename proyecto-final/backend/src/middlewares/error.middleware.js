/*
* Manejador de rutas no encontradas 404
*/
export const notFound = ((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Error 404 - Not Found"
    })
    next();
});

export default notFound;

//module.exports { notFound };
