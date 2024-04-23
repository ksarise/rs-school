import RequestTypes from '../../types/requests';

export default function FormSubmit(
  event: Event,
  firstName: string,
  password: string,
  socket: WebSocket
) {
  event.preventDefault();
  const authPayload = {
    user: {
      login: firstName,
      password,
    },
  };
  const message = {
    id: Math.random().toString(),
    type: RequestTypes.USER_LOGIN,
    payload: authPayload,
  };
  const sessionData = {
    id: message.id,
    login: firstName,
    password,
  };
  socket.send(JSON.stringify(message));
  sessionStorage.setItem('ksariseUser', JSON.stringify(sessionData));
}
