import fs from 'fs';
import path from 'path';

export const SUPPORTED_EXT = ['.txt'];
/**
 * Given a path to a text file this function will extract it's content.
 * @summary Given a path to a text file this function will extract it's content.
 * @param {string} path - a path to locate a text file.
 * @return {string} content of the file.
 */
export const extractor = async (inputPath: string): Promise<string> => {
  // check file extension
  const ext = path.extname(inputPath);

  if (!SUPPORTED_EXT.includes(ext))
    throw new Error(
      `file extension not supported pick a file with the following extensions: ${SUPPORTED_EXT}`
    );
  // resolving the file path into an absolute path by having the current working directory as reference
  const resolvedPath = path.resolve(process.cwd(), inputPath);
  return new Promise((resolve, reject) => {
    // we are using the native readFile function provided by nodejs to read our text file
    // notice that when handling files above 10MB it's best to use a stream instated of a buffer eg: fs.createReadStream()
    fs.readFile(resolvedPath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(data);
    });
  });
};
