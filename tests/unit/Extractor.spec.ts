import { extractor, SUPPORTED_EXT } from '../../src/Extractor';

describe('the extractor function should extract content properly', () => {
  it('should throw error if file format not supported', () => {
    expect(async () => {
      await extractor('myFile.pdf').catch((e) => {
        throw new Error(e);
      });
    }).rejects.toThrow(
      `file extension not supported pick a file with the following extensions: ${SUPPORTED_EXT}`
    );
  });
  it("should throw error if file don't exist", () => {
    expect(async () => {
      await extractor('IDoNotExist.txt').catch((e) => {
        throw new Error(e);
      });
    }).rejects.toThrow();
  });
  // it('should work with relative paths', async () => {
  //   await extractor('./tests/unit/files/palilalia.txt').then((data) => {
  //     expect(data).toBeDefined();
  //   });
  // });
  it('should load content properly', async () => {
    await extractor('./tests/unit/files/palilalia.txt').then((data) => {
      const content = `Palilalia is defined as the repetition of the speaker's words or phrases, often for a varying number of repeats.`;
      expect(data).toEqual(content);
    });
  });
});
