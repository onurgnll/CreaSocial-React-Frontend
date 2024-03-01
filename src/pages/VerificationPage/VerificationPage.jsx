import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, verifyUser } from "../../redux/features/loginSlice";

import logo from '../../assets/logo.png'
import "./verification.css"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

function VerificationPage() {

    const [verificationCode1, setverificationCode1] = useState("");
    const [verificationCode2, setverificationCode2] = useState("");
    const [verificationCode3, setverificationCode3] = useState("");
    const [verificationCode4, setverificationCode4] = useState("");
    const [verificationCode5, setverificationCode5] = useState("");
    const [verificationCode6, setverificationCode6] = useState("");
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    const user = useSelector((state) => state.login.user)

    const dispatch = useDispatch();

    const handleVerificate = async (e) => {
        e.preventDefault();

        setLoading(true)

        const req = await fetch(import.meta.env.VITE_API_URL + "/auth/verifyaccount/" + user.userId, {
            method: "POST",
            body: JSON.stringify({
                verificationCode: verificationCode1 + verificationCode2 + verificationCode3 + verificationCode4 + verificationCode5 + verificationCode6,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
        const res = await req.json();
        if (res.success) {
            setLoading(false)
            toast.success("Hesabınız Başarıyla Doğrulandı.", {
                position: "bottom-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "light",
                onClose: () => {
                    dispatch(verifyUser())
                    dispatch(login(res.data))
                    localStorage.setItem("user", JSON.stringify(res.data))
                    navigate("/")
                }
            });
        } else {
            setLoading(false)
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
        }

    }


    return (
        <div className="h-100 d-flex flex-column justify-content-center align-items-center">

            <div className="d-flex flex-column align-items-center justify-content-center">

                <img src={logo} width="80%" alt="" />
            </div>
            <form onSubmit={handleVerificate} className="d-flex flex-column">
                <div className="d-flex">
                    <input type="text"
                        className="dogrula"
                        maxLength={1}
                        id={`verificationCode1`}
                        value={verificationCode1}
                        onChange={(e) => { setverificationCode1(e.target.value); const nextInput = document.getElementById(`verificationCode2`); nextInput.focus() }}
                    />
                    <input type="text"
                        className="dogrula"
                        maxLength={1}
                        id={`verificationCode2`}
                        value={verificationCode2}
                        onChange={(e) => { setverificationCode2(e.target.value); const nextInput = document.getElementById(`verificationCode3`); nextInput.focus() }}
                    />
                    <input type="text"
                        className="dogrula"
                        maxLength={1}
                        id={`verificationCode3`}
                        value={verificationCode3}
                        onChange={(e) => { setverificationCode3(e.target.value); const nextInput = document.getElementById(`verificationCode4`); nextInput.focus() }}
                    />
                    <input type="text"
                        className="dogrula"
                        maxLength={1}
                        id={`verificationCode4`}
                        value={verificationCode4}
                        onChange={(e) => { setverificationCode4(e.target.value); const nextInput = document.getElementById(`verificationCode5`); nextInput.focus() }}
                    />
                    <input type="text"
                        className="dogrula"
                        maxLength={1}
                        id={`verificationCode5`}
                        value={verificationCode5}
                        onChange={(e) => { setverificationCode5(e.target.value); const nextInput = document.getElementById(`verificationCode6`); nextInput.focus() }}
                    />
                    <input type="text"
                        className="dogrula"
                        maxLength={1}
                        id={`verificationCode6`}
                        value={verificationCode6}
                        onChange={(e) => { setverificationCode6(e.target.value) }}
                    />

                </div>

                <button className="btndogrula" onSubmit={handleVerificate}>{loading ? <span className="spinner-border spin"></span> : <span className="spin">Doğrula</span>}</button>
            </form>
            <ToastContainer></ToastContainer>
        </div>
    );
}

export default VerificationPage;