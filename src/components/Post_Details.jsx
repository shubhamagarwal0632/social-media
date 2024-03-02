import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../firebase.config';
import { Comments } from './Comments';


export const Post_Details = () => {
  const [data, setData] = useState('');
  const { id } = useParams();
  // ab data ko fetch krte h 
  // step 1

  useEffect(() => {
    const getsingledoc = async (id) => {
      const ref = doc(db, "post", id);
      getDoc(ref).then((kuchbh) => setData(kuchbh.data()));
    }
    getsingledoc(id);
  }, [id])
  return (
    <>
      <div className="container text-center my-5">
        <div className="post_detail">
          <div className="post_detail_img">
            <img src={data.imageUrl} alt="" />
          </div>
          <div className="">

            <div className="post_detail_user">
              <img src={data.photoUrl} alt="" />
              <h5>{data.author}</h5>
              </div>
            <h1>{data.title}</h1>
            <p>{data.description}</p>
          </div>
        </div>
         {/* commments ko particular img ki id send kr */}
        <Comments postid={id} />
      </div>
    </>
  )
}
