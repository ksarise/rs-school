export default function dynamicPropSize(words: string[], word: string): string {
  const worcContainerProportionalLength: string = `${(word.length / words.length) * 100}%`;
  return worcContainerProportionalLength;
}
