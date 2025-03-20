import React, { useState } from "react";
import "./Form.css";
function LoginForm(props) {

    const [user, setUser] = useState({
        email: "",
        password: "",
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!user.email.trim() || !user.password.trim()) {
            alert("Credenciais estão faltando. Preencha todos os campos.");
            return;
        }
        props.onSubmitForm(user);
    };
    return (
        <form onSubmit={handleSubmit} className={"form"}>
            <h1>Entrar:</h1>
            <label htmlFor="email">Email:</label>
            <input
                value={user.email}
                type="email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email..."
                name="email"
                id="email"
                data-testid="email-input"
            />
            <label htmlFor="password">Senha:</label>
            <input
                value={user.password}
                type="password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Senha..."
                name="password"
                id="password"
                data-testid="password-input"
            />
            <button data-testid="submit-button">Entrar</button>
        </form>
    );
}

export default LoginForm;
