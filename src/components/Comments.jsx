import { addDoc, collection, doc, getDoc, onSnapshot, orderBy, query } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase.config'
import { getAuth } from 'firebase/auth'
import { ShowComments } from './ShowComments'


export const Comments = ({postid}) => {


    const auth = getAuth();
    const [comments, setComments] = useState([]);
    const [newcomments, setNewComments] = useState("")



    const handleaddcomments = async (e) => {
        e.preventDefault();
    //     // ab adddoc ko add krna h firebase ke liya
    //     // addDoc me comments ka matlb database me issi name se save hogi file fir // data ki details ko add krte h data me
        if (auth.currentUser) {

            const data = {
                // isme jo postid aa rhi h vo postdetails se aa rhi h
                postid,
                userid:auth.currentUser.uid,
                commentsvalueyhakuchbhidesakteh: newcomments,
                author: auth.currentUser.displayName,
                photoUrl: auth.currentUser.photoURL,
                time: new Date()
            }
            await addDoc(collection(db, "comments"), data);
            setNewComments('    ')
            alert('comments added')
        } else {
            alert("login first");
        }
    }

    
    useEffect(()=>{
        const commentQuery = query(collection(db,"comments"),orderBy("time", "desc"));
        const fetchData = async ()=>{
          await onSnapshot(commentQuery,(snapshot)=>{
            setComments(snapshot.docs.map((kuchbh)=>({
              ...kuchbh.data(),id:kuchbh.id
            })))
          })      
        }
        fetchData();
        console.log("comments " ,comments);
      },[])

      const filterdata = comments.filter((kuchbh)=>kuchbh.postid == postid)
    return (
        <>
            <div className="container">

            <form onSubmit={handleaddcomments}>
                <div class="mb-3 comments">
                    <input
                        placeholder='please enter your comment here'
                        value={newcomments}
                        onChange={(e) => setNewComments(e.target.value)}
                        type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />

                    <button type="submit" class="btn btn-primary">comments</button>
                </div>
            </form>
            <h5>Total Commets : {filterdata.length} {filterdata.photoUrl}</h5>
            {
                filterdata.map((kuchbh)=><ShowComments key={kuchbh.userid} comments={kuchbh}/>)
            }
            </div>
        </>
    )

}