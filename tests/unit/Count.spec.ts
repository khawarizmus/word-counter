import { counter } from '../../src/Counter';
import { shuffle, words } from 'lodash-es';

describe('the counter function count words consistently', () => {
  it('should deburr content', () => {
    const content = `déjà vu`;

    const result = counter(content)
      .map((pair) => pair[0])
      .join(' ');

    expect(result).not.toBe('déjà vu');
    expect(result).toBe('deja vu');
  });
  it('should convert all content to lower case', () => {
    const content = `DéjA vU`;

    const result = counter(content)
      .map((pair) => pair[0])
      .join(' ');

    expect(result).toBe('deja vu');
  });
  it('should return sorted result', () => {
    const content = `Palilalia is defined as the repetition of the speaker's words or phrases, often for a varying number of repeats.
    Repeated units are generally whole sections of words and are larger than a syllable, with words being repeated the most often, followed by phrases, and then syllables or sounds.
    Palilalic repetitions are often spoken with decreasing volume and speed up over time.`;
    const result = counter(content).map((pair) => pair[1]);
    let isSorted = true;
    for (let i = 0; i < result.length; i++) {
      if (result[i] < result[i + 1]) {
        isSorted = false;
      }
    }
    expect(isSorted).toBeTruthy();
  });
  it('should be consistent with same frequency but different order', () => {
    const content = `Palilalia is defined as the repetition of the speaker's words or phrases, often for a varying number of repeats.
    Repeated units are generally whole sections of words and are larger than a syllable, with words being repeated the most often, followed by phrases, and then syllables or sounds.
    Palilalic repetitions are often spoken with decreasing volume and speed up over time.`;

    const suffuledContent = shuffle(words(content)).join(' ');

    expect(counter(content).map((pair) => pair[1])).toEqual(
      counter(suffuledContent).map((pair) => pair[1])
    );
  });
});
