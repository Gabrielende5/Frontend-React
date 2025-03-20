import React, { useState } from "react";
import RegisterForm from "../../components/authComponents/Register";
import LoginForm from "../../components/authComponents/Login";
import "./AuthPage.css"
import axios from "axios";

function Authpage() {
    const [registerPage, setRegisterPage] = useState(true);
    const registerHook = async (data) => {
        const response = await axios.post("http://localhost:4444/auth/register",data);
        if (response.status === 200) {
            console.log("registrou");
        }
    };
    const loginHook = async (data) => {
        const response = await axios.post("http://localhost:4444/auth/login", data);
        if (response.status === 200) {
            console.log("logou", response.data.token);
        }
    };
    return (
        <div id="auth-page">
            {registerPage ? (
                <>
                    <RegisterForm onSubmitForm={registerHook} />
                    <div className="navigate-link" onClick={() => setRegisterPage(false)}>
                        Ir para o login
                    </div>
                </>
            ) : (
                <>
                    <LoginForm onSubmitForm={loginHook} />
                    <div className="navigate-link" onClick={() => setRegisterPage(true)}>
                        Ir para o registro
                    </div>
                </>
            )}
        </div>
    );
}

export default Authpage;