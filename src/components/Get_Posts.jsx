import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase.config'
import { Post } from './Post'

export const Get_Posts = () => {
  const [posts, setPosts] = useState([])
  useEffect(()=>{
    const postQuery = query(collection(db,"post"),orderBy("time", "desc"));
    const fetchData = async ()=>{
      await onSnapshot(postQuery,(snapshot)=>{
        setPosts(snapshot.docs.map((kuchbh)=>({
          ...kuchbh.data(),id:kuchbh.id
        })))
      })      
    }
    fetchData();
    console.log(posts);
  },[])
  return (
    <>
    {
      posts.map((data)=><Post key={data.id} data={data}/>)
    }
    </>
  )
}
