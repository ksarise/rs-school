export default function Validator(value: string, nameLength: number): string {
  let message: string = '';
  if (nameLength > value.length) {
    message = `Minimum ${nameLength} letters`;
  } else if (!/^[A-Z]/.test(value[0])) {
    message = 'The first letter must be uppercase';
  } else if (!/^[A-Za-z-]+$/.test(value)) {
    message = 'Only English alphabet letters or the hyphen';
  } else {
    message = 'ok';
  }
  return message;
}
