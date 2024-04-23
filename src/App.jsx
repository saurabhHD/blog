import { useDispatch } from "react-redux"
import {login, logout} from "./features/auth/authSlice"
import { useEffect, useState } from "react"
import authService from "./appwrite/auth"
import { Header, Footer } from "./components"

function App() {

  const [loading, setLoding] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login(userData))
      }else{
        dispatch(logout())
      }
    })
    .catch(()=>{
      dispatch(logout())
    })
    .finally(()=>{
      setLoding(false)
    })
  }, [])

  return (
    <div>
      <Header />
      Hwllo {loading}
      <Footer />
    </div>
  )
}

export default App
