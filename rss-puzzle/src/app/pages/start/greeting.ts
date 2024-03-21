export default function getUser(): string {
  const data = localStorage.getItem('ksarisePuzzleSession');
  if (data) {
    const parseData = JSON.parse(data);
    return `Hello, ${parseData.name} ${parseData.surname} !`;
  }
  return 'no local storage!';
}
