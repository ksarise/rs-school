export default function shuffle(array: string[]) {
  const arr: string[] = array;
  let currentIndex: number = arr.length;
  let randomIndex: number;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }

  return arr;
}
