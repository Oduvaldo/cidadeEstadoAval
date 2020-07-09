const constraintError = (message = '') => {
    throw `CONSTRAINT_ERROR:${message}`;
}

const typeError = (message = '') => {
    throw `TYPE_ERROR:${message}`;
}

const validationError = (message = '') => {
    throw `VALIDATION_ERROR:${message}`;
}

module.exports = {
    constraintError,
    typeError,
    validationError,
}