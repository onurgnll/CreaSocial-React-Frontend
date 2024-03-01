import { useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from '../../assets/logo.png'
import "./loginpage.css"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/loginSlice";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");


    const [password, setPassword] = useState("");
    const [loading, setloading] = useState(false);

    const [registeration, setRegisteration] = useState(false);


    const navigate = useNavigate();
    const dispatch = useDispatch();


    const handleRegister = async (e) => {
        e.preventDefault();

        setloading(true);

        const req = await fetch(import.meta.env.VITE_API_URL + "/auth/register", {
            method: "POST",
            body: JSON.stringify({
                email,
                password
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })

        const res = await req.json();

        if (res.success) {
            setloading(false)
            localStorage.setItem("user", JSON.stringify(res.data.user))
            localStorage.setItem("token", res.data.token)
            dispatch(login(res.data.user))
            navigate("/verifyAccount")

        } else {


            toast.error(res.data, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
            setloading(false)
        }

    }


    const handleLogin = async (e) => {

        e.preventDefault();
        setloading(true);
        const req = await fetch(import.meta.env.VITE_API_URL + "/auth/login", {
            method: "POST",
            body: JSON.stringify({
                name,
                surname,
                email,
                password
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        const res = await req.json();

        if (res.success) {

            setloading(false)
            dispatch(login(res.data.user))
            localStorage.setItem("user", JSON.stringify(res.data.user))
            localStorage.setItem("token", res.data.token)
            navigate("/")

        } else {


            toast.error(res.data, {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light"
            });
            setloading(false)
        }

    };

    return (
        <div className="h-100 w-100 d-flex justify-content-center">
            <div className="d-flex flex-column">
                <div className="d-flex flex-column align-items-center justify-content-center">

                    <img src={logo} width="80%" alt="" />
                </div>
                <div className="d-flex flex-column align-items-center p-1">
                    {!registeration ?
                        <form onSubmit={handleLogin} className="d-flex flex-column w-75">
                            <input
                                type="email"
                                required
                                className="inpp"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="E-posta"
                            />
                            <input
                                className="inpp"
                                required
                                minLength={6}
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Şifre"
                            />
                            <button className="btnlogin" onSubmit={handleLogin}>{loading ? <span className="spinner-border spin"></span> : <span className="spin">Giriş</span>}</button>
                            <div className="d-flex justify-content-center">

                                <span onClick={() => setRegisteration(true)} className="toregister">Hesabınız Yok mu? Kayıt olun.</span>
                            </div>
                        </form>



                        :



                        <form onSubmit={handleLogin} className="d-flex flex-column w-75">
                            <div className="d-flex justify-content-between">
                                <div style={{ width: "48%" }}>
                                    <input
                                        style={{ width: "100%" }}
                                        type="text"
                                        required
                                        className="inpp"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="İsim"
                                    />

                                </div>
                                <div style={{ width: "48%" }}>

                                    <input
                                        style={{ width: "100%" }}
                                        type="text"
                                        required
                                        className="inpp"
                                        value={surname}
                                        onChange={(e) => setSurname(e.target.value)}
                                        placeholder="Soyisim"
                                    />

                                </div>

                            </div>
                            <input
                                type="email"
                                required
                                className="inpp"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="E-posta"
                            />
                            <input
                                className="inpp"
                                required
                                minLength={6}
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Şifre"
                            />
                            <button className="btnlogin" onSubmit={handleRegister}>{loading ? <span className="spinner-border spin"></span> : <span className="spin">Kayıt Ol</span>}</button>
                            <div className="d-flex justify-content-center">

                                <span onClick={() => setRegisteration(false)} className="toregister">Zaten Hesabınız Var mı? Giriş Yap.</span>
                            </div>

                        </form>

                    }
                </div>

            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
}

export default LoginPage;
