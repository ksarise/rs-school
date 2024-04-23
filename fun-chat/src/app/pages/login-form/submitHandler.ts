export default function FormSubmit(
  event: Event,
  firstName: string,
  password: string
) {
  event.preventDefault();
  const data = { name: firstName, surname: password };
  sessionStorage.setItem('ksariseUser', JSON.stringify(data));
  console.log('suc');
}
