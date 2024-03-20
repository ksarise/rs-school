function getUser(): string {
  const data = localStorage.getItem('ksarisePuzzleSession');
  if (data) {
    const parseData = JSON.parse(data);
    return `${parseData.name} ${parseData.surname}`;
  }
  return 'no local storage!';
}
const greetingUser: string = `Hello, ${getUser()} !`;
export default greetingUser;
