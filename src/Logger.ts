import { createLogger, format, transports, addColors } from 'winston';
// import prettyConsoleFormat from 'winston-format-pretty-console';

const myFormat = format.printf(({ level, message, label, timestamp, durationMs }) => {
  return durationMs
    ? `\n${message} done in: ${durationMs} ms`
    : `[${level}]: [${timestamp}] ${label}:  ${message}`;
});

const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
  },
  colors: {
    error: 'red',
    warn: 'orange',
    info: 'blue',
    http: 'yellow',
    verbose: 'gray',
    debug: 'gray',
    silly: 'gray',
  },
};

export const logger = createLogger({
  levels: customLevels.levels,
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.colorize(),
    format.label({ label: 'word-counter' }),
    format.splat(),
    format.ms(),
    myFormat
  ),
  defaultMeta: { service: 'word-counter' },
  transports: [
    new transports.Console(),
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `logs.log`
    //
    new transports.File({ filename: 'error.log', level: 'error', format: format.uncolorize() }),
    new transports.File({ filename: 'logs.log', format: format.uncolorize() }),
  ],
});

addColors(customLevels.colors);
