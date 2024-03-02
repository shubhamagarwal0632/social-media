import { signInWithPopup, GoogleAuthProvider, getAuth } from 'firebase/auth'
import React from 'react'
import { db } from '../firebase.config'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { Link, useNavigate } from 'react-router-dom'


export const Navbar = () => {
    const auth = getAuth();
    const navigate =useNavigate();
    const googleclick = async () => {
        const provider = new GoogleAuthProvider();
        const result = await signInWithPopup(getAuth(), provider);
        // console.log(result)
        const user = result.user;

        // check for user
        const docref = doc(db, 'users', user.uid);
        const docsnap = await getDoc(docref);

        if (!docsnap.exists()) {
            await setDoc(doc(db, 'users', user.uid), {
                name: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
                timestamp: serverTimestamp()
            })
        }
        navigate('/profile')
    }
    const logout = async() => {
        await auth.signOut()
        navigate('/')
        alert('logged out')
    }
    return (
        <>
            <div className="nav-bar">
                <div className='text-white'>
                <Link to={'/'} className="left">
                    {auth.currentUser ? (
                        <>
                            <img src={auth?.currentUser?.photoURL} alt="" />
                            <h1>{auth?.currentUser?.displayName}</h1>
                        </>
                            )
                        : (

                            <h2>Social Media App</h2>
                        )
                }
                </Link>
                </div>
                <div className="right">
                    {!auth.currentUser &&  <button className='button' onClick={googleclick}>Login With Google</button>
                    }
                    {auth.currentUser && <Link to={'/post'} className='button text-decoration-none'>Post</Link>
                    }
                    {auth.currentUser && <Link to={'/profile'} className='button text-decoration-none'>Profile</Link>
                    }
                   <Link to={'/users'} className='button text-decoration-none'>All Users</Link>
                    {auth.currentUser &&  <button to={'/'} className='button' onClick={logout}>Log Out</button>
                }
                   </div>
            </div>
        </>
    )
}
