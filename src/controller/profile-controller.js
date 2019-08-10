export const profileFunction = (user, newName) => {

return user.updateProfile({
  displayName: newName,
  //photoURL: "https://example.com/jane-q-user/profile.jpg"
}).then(function() {
  // Update successful.
}).catch(function(error) {
  // An error happened.
  console.log(error);
});
}