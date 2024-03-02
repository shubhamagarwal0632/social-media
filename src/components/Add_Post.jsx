import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react'
//step2 me ye 3 add krte h
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, storage } from '../firebase.config';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const Add_Post = () => {

  const auth = getAuth();
  // step1
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  // image ke liye ek function batata padta h
  const handlechangeimg = (e) => {
    // e.target.file[0] index pr image h to setImage me daldo
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  }

  // step 3

  const handlesubmit = async (e) => {
    e.preventDefault();
    // step6
    if(auth.currentUser){
      try {

        const storageRef = ref(storage, `images/${image.name}`);
        const uploadTask = uploadBytesResumable(storageRef, image);
        await uploadTask;
        const url = await getDownloadURL(uploadTask.snapshot.ref);
        console.log('Download Url',url)
  
        const data = {
          author: auth.currentUser.displayName,
          email: auth.currentUser.email,
          photoUrl: auth.currentUser.photoURL,
          userId: auth.currentUser.uid,
          title,
          description,
          imageUrl: url,
          time: serverTimestamp(),
  
        }
        //step 4 isko database me add krna or post = name 
        const saveData = await addDoc(collection(db, "post"), data)
        setTitle('')
        setDescription('')
        toast.success('🦄 add succ', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Bounce,
          });
        useNavigate('/');

      } catch (error) {
        console.error('error', error);
        
        // console.error("Error uploading..", error.message);
      }
    }else{
      alert('login first')
    }
    
  }
  return (
    <>
     <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className='container add_post my-5'>
        <form onSubmit={handlesubmit}>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
            <input
              value={title}
              //required se fill krna important hota h
              required
              onChange={(e) => setTitle(e.target.value)}
              type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
            <input
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
              type="text" className="form-control" id="exampleInputPassword1" />
          </div> <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Img</label>
            <input type="file"
              // value={image}
              onChange={handlechangeimg}
              required
              accept='image/*'
              className="form-control" id="exampleInputPassword1" />
          </div>


          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  )
}
