export function login(email, password) {
  return fetch('http://192.168.1.66:3005/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email: email, password: password }),
  }).then((res) => res.json());
}
