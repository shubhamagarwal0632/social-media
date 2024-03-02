import React from 'react'

export const ShowComments = ({ comments }) => {
    return (
        <>
            <div className="container comments_container ">
                <div className="comments_user">

                <img src={comments.photoUrl} alt="" />
                <h5>{comments.author}</h5>
                </div>
                <h1>{comments.commentsvalueyhakuchbhidesakteh}</h1>


            </div>
        </>
    )
}
