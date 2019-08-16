// importamos la funcion que vamos a testear
/* import { signIn } from '../src/controller-firebase/controller-authentication.js';

describe('signIn', () => {
  it('debería ser una función', () => {
    expect(typeof signIn).toBe('function');
  });
}); */

// configurando firebase mock
// iniciando tests

import { signIn } from '../src/controller-firebase/controller-authentication.js';

const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockFirebase();
const mockfirestore = new firebasemock.MockFirestore();

mockfirestore.autoFlush();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  path => (path ? mockfirestore.child(path) : null),
  () => mockauth,
  () => mockfirestore,
);

describe('lista de notas', () => {
  it('Debería poder iniciar sesion', () => signIn('front@end.la', '123456')
    .then((user) => {
      expect(user.email).toBe('front@end.la');
    }));
});
