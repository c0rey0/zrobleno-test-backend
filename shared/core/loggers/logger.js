const { loggers, format, transports } = require('winston');
/* eslint-disable */
const { combine, timestamp, label, printf } = format;

const LogFormat = printf(({ level, message, label, timestamp }) => `${timestamp} [${label}] ${level}: ${message}`);
/* eslint-enable */

const createLogger = (logFolder, logName) => {
  const LogTransport = new (transports.DailyRotateFile)({
    filename: `logs/${logFolder}/${logName}-%DATE%.log`,
    datePattern: 'YYYY-MM',
    zippedArchive: true,
    maxSize: '100m'
  });
  loggers.add(logName, {
    format: combine(
      label({ label: logName }),
      timestamp(),
      LogFormat
    ),
    transports: [
      LogTransport,
      new transports.Console()
    ],
    exitOnError: false
  });
};

module.exports = {
  createLogger
};
