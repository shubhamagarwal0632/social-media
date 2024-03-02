import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { auth, db } from '../firebase.config'

export const All_Users = () => {
  const [users, setUsers] = useState([])
  useEffect(() => {
    const userQuery = query(collection(db, "users"), orderBy("timestamp", "desc"));
    const fetchData = async () => {
      await onSnapshot(userQuery, (snapshot) => {
        setUsers(snapshot.docs.map((kuchbh) => ({
          ...kuchbh.data(), id: kuchbh.id
        })))
      })
    }
    fetchData();
    console.log(users);
  }, [])
  return (
    <>
      <div className="container">
        {
          users.map((vale) => (
            
            <div className='container_alluser'>
              <div className="left">
                <img src={vale.photoURL} alt="" />
                <h1>{vale.name}</h1>
                <h5>{vale.email}</h5>
              </div>
                <div className="right">
                  <h6>{auth.currentUser.metadata.creationTime}</h6>
                </div>
            </div>
          ))
        }
      </div>
    </>
  )
}
