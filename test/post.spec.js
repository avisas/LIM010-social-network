import MockFirebase from '../_mocks_/firebase-mock.js';

import { addPostFirebase } from '../src/controller-firebase/controller-post.js';

global.firebase = MockFirebase();

describe('Add post', () => {
  // eslint-disable-next-line arrow-body-style
  it('Debería poder agregar un post', () => {
    return addPostFirebase('primer post', 'publico', '001', '').then((data) => {
      expect(data).toBe('primer post');
    });
  });
});
