import MockFirebase from 'mock-cloud-firestore';
import {
  addPostFirebase, showPostFirebase, deletePostFirebase, editPostFirebase, showPostUserFirebase,
} from '../src/model/model-post.js';

const fixtureData = {
  __collection__: {
    post: {
      __doc__: {
        a01: {
          img: '',
          notes: 'post 1',
          privacidad: 'publico',
          timePost: '1 de septiembre de 2019 - 12:32 p. m.',
          user: '1',
          userName: 'Alba',
        },
        a02: {
          img: '',
          notes: 'post 2',
          privacidad: 'publico',
          timePost: '1 de septiembre de 2019 - 12:32 p. m.',
          user: '2',
          userName: 'Liliana',
        },
        a03: {
          img: '',
          notes: 'post 3',
          privacidad: 'privado',
          timePost: '1 de septiembre de 2019 - 12:32 p. m.',
          user: '2',
          userName: 'Liliana',
        },
      },
    },
  },
};

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });
describe('Add post', () => {
  it('Debería poder agregar un post', done => addPostFirebase('primer post', 'publico', '001', 'Liliana', '').then(() => {
    const callback = (notes) => {
      const result = notes.find(elemento => elemento.notes === 'primer post');
      expect(result.notes).toBe('primer post');
      done();
    };
    showPostFirebase(callback);
  }));
});

describe('showPostUserFirebase', () => {
  it('debería leer todos los posts de un usuario', done => showPostUserFirebase('2', (data) => {
    const result = data.filter(post => post.user === '2');
    expect(result).toHaveLength(2);
    done();
  }));
});

describe('Delete post', () => {
  it('Deberia poder eliminar el post con id a02', done => deletePostFirebase('a02').then(() => {
    const callback = (notes) => {
      const result = notes.find(elemento => elemento.id === 'a02');
      expect(result).toBe(undefined);
      done();
    };
    showPostFirebase(callback);
  }));
});

describe('Edit post', () => {
  it('Deberia poder editar el post con id a01', done => editPostFirebase('a01', 'post editado', 'publico').then(() => {
    const callback = (notes) => {
      const result = notes.find(elemento => elemento.notes === 'post editado');
      expect(result.notes).toBe('post editado');
      done();
    };
    showPostFirebase(callback);
  }));
});
