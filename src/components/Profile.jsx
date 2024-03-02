import { getAuth } from 'firebase/auth'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase.config'
import { Post } from './Post'
import { Link } from 'react-router-dom'

export const Profile = () => {
  const auth = getAuth();

  const [posts, setPosts] = useState([])
  useEffect(() => {
    const postQuery = query(collection(db, "post"), orderBy("time", "desc"));
    const fetchData = async () => {
      await onSnapshot(postQuery, (snapshot) => {
        setPosts(snapshot.docs.map((kuchbh) => ({
          ...kuchbh.data(), id: kuchbh.id
        })))
      })
    }
    fetchData();
    console.log(posts);
  }, [])
  return (
    <>
      <div>
        {auth.currentUser ? <div className="container text-center my-5">

          <div className="profile_user">

            <img src={auth.currentUser.photoURL} alt="" />

            <h5>{auth.currentUser.displayName}</h5>
            <h2>{auth.currentUser.email}</h2>
            <h2>Last Login {auth.currentUser.metadata.creationTime}</h2>
          </div>


        </div> :
          alert("login first then use this functionality")

        }


        {
          posts.filter((post) => post.userId == auth.currentUser.uid).map((data) => <Post key={data.id} data={data} />)
        }
      </div>
    </>
  )
}
