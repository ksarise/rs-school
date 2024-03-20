/* eslint-disable import/no-cycle */
import app from '../../../app';

export default function FormSubmit(
  event: Event,
  firstName: string,
  lastName: string
) {
  event.preventDefault();
  const data = { name: firstName, surname: lastName };
  localStorage.setItem('ksarisePuzzleSession', JSON.stringify(data));
  app();
}
