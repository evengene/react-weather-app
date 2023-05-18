import pipe from 'lodash/flow';

const getInputChange = (event) => {
    return Object.freeze({
        name: event.target.name,
        value: event.target.value
    });
}

const withChange = (callback) => {
    return pipe(getInputChange, callback)
}

const preventDefault = (e) => {
    e.preventDefault();
    return e
}

export { getInputChange, withChange, preventDefault };