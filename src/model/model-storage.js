export const uploadImage = (file) => {
  const postImageRef = firebase.storage().ref().child(`images/${file.name}`);
  return postImageRef.put(file)
    .then(snapshot => snapshot.ref.getDownloadURL());
};
