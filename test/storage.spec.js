import { firebase } from '../_mocks_/firebase-mock.js';
import { uploadImage } from '../src/model/model-storage.js';

// const firebasemock = require('firebase-mock');

/* const mockauth = new firebasemock.MockAuthentication();
const mockdatabase = new firebasemock.MockFirebase();
const mockfirestore = new firebasemock.MockFirestore();
const mockstorage = new firebasemock.MockStorage();
const mockmessaging = new firebasemock.MockMessaging();
export const mocksdk = new firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  path => (path ? mockdatabase.child(path) : mockdatabase),
  // use null if your code does not use AUTHENTICATION
  () => mockauth,
  // use null if your code does not use FIRESTORE
  () => mockfirestore,
  // use null if your code does not use STORAGE
  () => mockstorage,
  // use null if your code does not use MESSAGING
  () => mockmessaging,
  () => ({
    ref: () => ({
      child: routeImage => ({
        put: () => (
          new Promise((resolve) => {
            resolve({
              ref: {
                getDownloadURL: () => ({ routeImage }),
              },
            });
          })
        ),
      }),
    }),
  }),
);
*/
global.firebase = firebase;

describe('uploadImage', () => {
  it('Debería ser una función', () => {
    expect(typeof uploadImage).toBe('function');
  });
  it('Debería', (done) => {
    const image = new File([], 'image.jpg');
    return uploadImage(image).then((data) => {
      expect(data.path).toBe('images/image.jpg');
      done();
    });
  });
});
