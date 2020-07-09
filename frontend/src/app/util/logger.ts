import { environment } from '../../environments/environment';

const buildMessage = (title = '', msg = '') => {
    console.log(title);
    console.log(msg);
};

export const info = (msg: any) => {
    buildMessage('INFO', msg);
};

export const error = (msg: any) => {
    buildMessage('ERROR', msg);
};

export const warn = (msg: any) => {
    buildMessage('WARN', msg);
};

export const debug = (msgFunction) => {
    if (environment.production) {
        buildMessage('DEBUG', msgFunction());
    }
};
