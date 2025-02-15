import {
  auth,
  createUserWithEmailAndPassword,
  database,
  set,
  ref,
  onAuthStateChanged,
} from "./config.js";

const handleSignup = () => {
  const email = document.getElementById("email-signup").value;
  const password = document.getElementById("password-signup").value;
  if (email && password) {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      console.log("userCredentials", userCredentials);
      const usersRef = ref (database,  `users/${userCredentials.user.uid}/`);
      set(usersRef, {
        email: email,
        password: password,
        createdAt: new Date().getTime(),
      });
    })
    .catch((error)=>{
      console.log(error);
    });
  }
};

const button = document.getElementById("signup-btn");
if(button){
  button.addEventListener("click", (e)=>{
    e.preventDefault();
    handleSignup();
  });
}
console.log(window.location.pathname);
onAuthStateChanged(auth, (user)=>{
  if(user){
    if(window.location.pathname!=="/post.html"){
      window.location.href = "../post.html";
    }
  }else{
    if(window.location.pathname !== "/Index.html"){
      window.location.href = "../Index.html";
    }
  }
});