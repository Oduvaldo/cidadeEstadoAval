const response_200 = (req, res, args, options) => {
    const status = 200;

    const response = {
        status,
    }

    if (args) {
        let dataFieldName = 'data';

        if (options && options.dataFieldName) dataFieldName = options.dataFieldName;

        response[dataFieldName] = args;
    }

    res.status(status)
        .send(response);
}

const error = (req, res, error) => {
    const response = {
        status: 500,
        message: 'SYSTEM_FAILURE',
    }

    if (typeof error == 'string') {
        if (error.indexOf('TYPE_ERROR:') >= 0) {
            response.status = 400;
            response.message = error.split(':')[1];
        }
        else if (error.indexOf('VALIDATION_ERROR:') >= 0) {
            response.status = 401;
            response.message = error.split(':')[1];
        }
        else if (error.indexOf('CONSTRAINT_ERROR:') >= 0) {
            response.status = 401;
            response.message = error.split(':')[1];
        }
    }

    res.status(response.status)
        .send(response);
}

module.exports = {
    response_200,
    error,
}