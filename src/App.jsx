import { Route, Routes, useNavigate } from "react-router-dom"
import LoginPage from "./pages/LoginPage/LoginPage"
import MainPage from "./pages/MainPage/MainPage"
import "./app.css"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { login, verifyUser } from "./redux/features/loginSlice"
import VerificationPage from "./pages/VerificationPage/VerificationPage"

function App() {

  const {logged , user, isUserVerified} = useSelector((state) => state.login)
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"))
      dispatch(login(user))


      let isRoleVerified = user.authorities.some(authority => authority.name === "ROLE_VERIFIED");
      if (isRoleVerified) {
        dispatch(verifyUser())
      } else {
        navigate("/verifyAccount")
      }

    }
  }, []);


  return (
    <div className="h-100">

      <Routes>



        <Route path="/" element={logged ? isUserVerified ? <MainPage></MainPage>: <VerificationPage></VerificationPage> :  <LoginPage></LoginPage>} />
        <Route path="/login" element={!logged ? <LoginPage></LoginPage> : <MainPage></MainPage>} />
        <Route path="/verifyAccount" element={logged ? !isUserVerified ? <VerificationPage /> : <MainPage></MainPage> : <LoginPage></LoginPage>} />


      </Routes>


    </div>
  )
}

export default App
