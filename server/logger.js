const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;


const myFormat = printf(({ level, message, location, timestamp }) => {
    return `${timestamp} ${level}: ${message} [${location ? location : ''}]`;
});


const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.File({ filename: 'logs/error.log', level: 'Error' }),
        new transports.File({ filename: 'logs/info.log' }),
    ],
});

module.exports = logger;
