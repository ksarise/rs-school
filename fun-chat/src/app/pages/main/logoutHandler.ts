import RequestTypes from '../../types/requests';

export default function LogoutHandler(event: Event, socket: WebSocket): void {
  event.preventDefault();
  const data = sessionStorage.getItem('ksariseUser') as string;

  const sessionData = JSON.parse(data);
  console.log(sessionData);
  const authPayload = {
    user: {
      login: sessionData.login.trim(),
      password: sessionData.password.trim(),
    },
  };
  const message = {
    id: sessionData.id.trim(),
    type: RequestTypes.USER_LOGOUT,
    payload: authPayload,
  };
  socket.send(JSON.stringify(message));
}
