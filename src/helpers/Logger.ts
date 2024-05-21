const winston = require('winston');

const options = {
    level: "info",
    transports: [
        new winston.transports.Console({
            level: "info",
            colorize: false
        }),
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'info',
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false
        })
    ]
}

export const logger = winston.createLogger(options);