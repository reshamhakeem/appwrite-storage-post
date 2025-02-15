import {set, ref, database, push, onChildAdded} from "./config.js";
const { Client, Storage, ID } = Appwrite;
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("67a6f6da00283ae1ccfe");

const storage = new Storage(client);

const addPost = (imageSrc) => {
  const content = document.getElementById("content").value;
  const ImageFile = document.getElementById("imageFile").files[0];

  const promise = storage.createFile(
    "67a6fd39000796295204",  //bucket id
    ID.unique(),
    ImageFile
  )
  promise.then(
    function (response) {
      console.log(response); 
      const result = storage.getFileDownload('67a6fd39000796295204', response.$id);
      // console.log(result);

      //firbase m realtime databas k liye coding
      // const postRef = ref(database, `Post/ ${new Date().getTime()}`); //uique id deni hoti h firebase ko is liye new date ka method follow krte h but ye achi practice nh
      // set(postRef, {
      //   content,
      //   url: result,
      // })
      //ye method follow krna chahye firebase m data store krwane k liye
      const postRef = ref(database, `Post/`);
      const uniqueIdRef = push(postRef)
      set(uniqueIdRef, {
        content,
        url: result,
      })
      
      .then((value)=>{
        alert("Post added to Database");
      })
      .catch((error)=>{
        console.log(error);
      });
    },
    function (error) {
      console.log(error);
    }
  );
};

//console m data get krne ka method 
let postArr = [];
const getPosts  = ()=> {
  const postRef = ref(database, `Post/`);
  onChildAdded(postRef, (snapshot)=>{
    const data = snapshot.val();
    postArr.push(data);
    console.log(postArr);
    const postContainer = document.getElementById("posts");
    postArr.forEach((item, i)=>{
      let html = `<div id="post">
      <img width="100" height="100" src=${item.url} alt="">
      <p>${item.content}</p>
  </div>`;
  postContainer.innerHTML += html;
    });
  });
};

getPosts();


const button = document.getElementById("post-btn");
button.addEventListener("click", addPost);




