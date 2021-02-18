import _ from 'lodash';
import { IWordCount } from 'WordCount';

export const counter = (content: string): Array<[string, number]> => {
  // We start by normalizing the content to get consistent results and avoid cavitates
  // first we deburr the content: 'déjà vu' => 'deja vu'
  // https://lodash.com/docs/4.17.15#deburr
  let normalized = _.deburr(content) as string;
  // then we convert everything to lower case
  normalized = normalized.toLowerCase();

  // fragment the text ino individual words
  const fragmented = _.words(normalized);
  // counting the occurrence of words and returning an object of type IWordCount
  // https://lodash.com/docs/4.17.15#countBy
  const counted = _.countBy(fragmented) as IWordCount;

  // because the ordering of object properties is non-standard in ECMAScript
  // we convert them to an array and we sort the array
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries
  return Object.entries(counted).sort((a, b) => b[1] - a[1]);
};
