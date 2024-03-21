export default function dynamicPropSize(words: string[], word: string): string {
  const wordsLetters: number = words
    .map((item) => item.length)
    .reduce((item, acc) => acc + item, 0);
  const worcContainerProportionalLength: string = `${(word.length / wordsLetters) * 100}%`;
  return worcContainerProportionalLength;
}
