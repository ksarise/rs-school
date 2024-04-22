export default function Validator(value: string, validType: string): string {
  let message: string = '';
  if (validType === 'text') {
    if (value.length < 4) {
      message = `Minimum 4 letters`;
    } else if (!/^[A-Za-z-]+$/.test(value)) {
      message = 'Only English alphabet letters or the hyphen';
    } else if (!/^[A-Z]/.test(value[0])) {
      message = 'The first letter must be uppercase';
    } else {
      message = 'ok';
    }
  } else if (validType === 'password') {
    if (value.length < 4) {
      message = `Minimum 4 letters`;
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])/.test(value)) {
      message = 'You must use at least one lowercase and one uppercase letter';
    }
  }
  return message;
}
