import { deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import { db } from '../firebase.config'
import { Link, useLocation } from 'react-router-dom'
// delete


export const Post = ({ data }) => {
  const location = useLocation();

  const deletepost = async (id) => {
    alert('confirmed for deleting the image')
    const deleteData = doc(db, "post", id);
    await deleteDoc(deleteData)
  }
  return (

    <>
      <div className="container container_post post_con my-5">
        <div className="post_user">
          <img src={data.photoUrl} alt="" />
          <h2>{data.author}</h2>
        </div>
        <div className="card p-5 mb-3 post_cart" >
          <div className="row g-0 padding">
            <div className="col-md-4 post_img ">
              <img src={data.imageUrl} className="img-fluid rounded-start post_img" alt="..." />
            </div>
            <div className="col-md-8 paddingforcard">
              <div className="card-body text-center card_box">
                <h5 className="card-title">{data.title}</h5>
                <h6 className="card-text">{data.description}</h6>
                <p className="card-text"><small className="text-body-secondary">{ }</small></p>
                <Link to={`/post/${data.id}`} className='btn btn-warning'>Comments</Link>
                <Link to={`/post/${data.id}`} className='btn btn-warning mx-2'>View More</Link>
                {location.pathname == "/profile" && <button className="btn btn-danger" onClick={() => deletepost(data.id)}>Delete</button>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
