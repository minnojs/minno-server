const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;


const myFormat = printf(({ level, message, log_id, timestamp }) => {
    return `${timestamp} ${level}: ${message} [${log_id ? log_id : ''}]`;
});


const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        myFormat
    ),
    transports: [
        new transports.File({ filename: 'logs/error.log', level: 'Error' }),
        new transports.File({ filename: 'logs/all.log' }),
    ],
});

module.exports = logger;
