import { cac } from 'cac';
import { extractor } from './src/Extractor';
import { counter } from './src/Counter';
import { logger } from './src/Logger';
import chalk from 'chalk';

const cli = cac();

cli.command('<file>', 'file name or path to count the words').action(async (file, options) => {
  logger.profile('task');
  if (options.verbose) {
    logger.level = 'verbose';
  }
  logger.verbose('processing the file: %s', file);
  await extractor(file)
    .then((data) => {
      counter(data).forEach((pair) => console.log(`${pair[0]}: ${pair[1]}`));
      logger.profile('task');
    })
    .catch((err) => {
      logger.error(new Error(err));
      logger.profile('task');
    });
});

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
