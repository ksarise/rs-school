export default function FormSubmit(
  event: Event,
  firstName: string,
  lastName: string
) {
  event.preventDefault();
  const data = { name: firstName, surname: lastName };
  localStorage.setItem('ksarisePuzzleSession', JSON.stringify(data));
  console.log('suc');
}
