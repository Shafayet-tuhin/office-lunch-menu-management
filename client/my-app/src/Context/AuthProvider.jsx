import { createContext, useEffect, useState } from "react"
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { app } from "../Firebase/firebase.config";
import axios from "axios"

export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  const createUser = (email , password) => {
    setLoading(true)
    return createUserWithEmailAndPassword(auth, email, password)
  }
   
  const signIn = ( email , password ) => {
    setLoading(true)
    return signInWithEmailAndPassword(auth, email, password)
  }
   

  const GoogleSignIn = () => {
    return signInWithPopup(auth, provider)
  }

  const logOut = () => {
    setLoading(true)
    return signOut(auth)
  }

  useEffect(() => {
    if (user) {
        fetch(`https://bistro-boss-roan.vercel.app/users/${user.email}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.role === 'admin') {
                    setIsAdmin(true)
                }
                else{
                  setIsAdmin(false)
                }
            })
    }
}, [user])


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currUser => {
      setUser(currUser)
      setLoading(false)
      setIsAdmin(false)
      
      // //// Token /// 

    
      if ( currUser) {
        axios.post("https://bistro-boss-roan.vercel.app/jwt" , { email: currUser.email} )
        .then(data => {
        //  console.log(data.data.token)
         localStorage.setItem("token", data.data.token)
        })
      }
      else {
        localStorage.removeItem("token")
      }
       
 
      // ////Token ///

    })
    return () => {
      return unsubscribe();
    }
  }, [])

  const obj = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    logOut,
    GoogleSignIn,
    isAdmin , 
    setIsAdmin
  }

  return (

    <AuthContext.Provider value={obj}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider