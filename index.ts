import { cac } from 'cac';
import { extractor } from './src/Extractor';
import { counter } from './src/Counter';
import { logger } from './src/Logger';
import chalk from 'chalk';

// instantiate a cli with a name
const cli = cac('word-counter');

// define the main command
cli
  .command('<file>', 'file name or path to count the words')
  .action(async (file, options) => {
    // start profiling
    logger.profile('task');
    // activate verbose mode if verbose option is provided
    if (options.verbose) {
      logger.level = 'verbose';
    }
    logger.verbose('processing the file: %s', file);
    // extract file content
    await extractor(file)
      .then((data) => {
        // count the words
        counter(data).forEach((pair) => console.log(`${pair[0]}: ${pair[1]}`));
        // log the performance
        logger.profile('task');
      })
      .catch((err) => {
        logger.error(new Error(err));
        logger.profile('task');
      });
  })
  // define example
  .example('word-counter myTextFile.txt')
  .example('word-counter path/to/myTextFile.txt');

// make the cli verbose
cli.option('-V, --verbose', 'Verbose logging');

// Display help message when `-h` or `--help` appears
cli.help();
// Display version number when `-v` or `--version` appears
// It's also used in help message
cli.version('0.0.0');

try {
  // Parse CLI args without running the command
  cli.parse(process.argv, { run: false });
  // Run the command programmatically to catch global errors related to the cli
  cli.runMatchedCommand();
} catch (err) {
  // Handling cli errors here..
  // preferred to use local consol log as these error are related to the use of the cli
  console.log(chalk.bgRed(`[ERROR]:`), err.message);
}
