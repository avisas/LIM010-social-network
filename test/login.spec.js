import {
  signIn, createUser, userCurrent, signInWithFacebook, signInWithGoogle, signOutLogin,
} from '../src/model/controller-authentication.js';

const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockFirebase();
const mockfirestore = new firebasemock.MockFirestore();

mockfirestore.autoFlush();
mockauth.autoFlush();
const mockprovider = new firebasemock.MockFirebase();
mockprovider.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  path => (path ? mockfirestore.child(path) : null),
  () => mockauth,
  () => mockfirestore,
  () => mockprovider,
);

describe('Crear un usuario', () => {
  it('Debería poder registrarse con email albayauri.29@gmail.com y password 123456', () => createUser('albayauri.29@gmail.com', '123456')
    .then((user) => {
      expect(user.email).toBe('albayauri.29@gmail.com');
    }));
});

describe('Iniciar sesión', () => {
  it('Debería poder iniciar sesion', () => signIn('albayauri.29@gmail.com', '123456')
    .then((user) => {
      expect(user.email).toBe('albayauri.29@gmail.com');
    }));
});

describe('User current', () => {
  it('Debería poder retornar el usuario que ha iniciado sesión', () => signIn('albayauri.29@gmail.com', '123456')
    .then(() => {
      expect(userCurrent().email).toBe('albayauri.29@gmail.com');
    }));
});

describe('Login con Facebook', () => {
  it('Debería poder iniciar sesion con Facebook', () => signInWithFacebook('albayauri.29@gmail.com', '123456')
    .then((user) => {
      expect(user.isAnonymous).toBe(false);
    }));
});

describe('Login con Google', () => {
  it('Debería poder iniciar sesion con Google', () => signInWithGoogle('albayauri.29@gmail.com', '123456')
    .then((user) => {
      expect(user.isAnonymous).toBe(false);
    }));
});

describe('Cerrar sesión', () => {
  it('Debería poder cerrar sesión', () => signOutLogin()
    .then((user) => {
      expect(user).toBe(undefined);
    }));
});
