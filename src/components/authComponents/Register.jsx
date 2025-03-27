import React, { useState } from "react";
import "./Form.css";

function RegisterForm(props) {
    const [user, setUser] = useState({
        name: "",
        email: "",
        idade: 0,
        password: "",
        confirmPassword: "",
        role: "common"
    });

    const [errors, setErrors] = useState({});

    // Função para validar o nome
    const validateName = () => {
        if (user.name.length < 4 || user.name.charAt(0) !== user.name.charAt(0).toUpperCase()) { //  Verifica se tem mais de 4 letras o nome e se inicia em maisculo 
            return "Nome precisa ter mais de 3 letras.";
        }
    };

    // Função para validar o email
    const validateEmail = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(user.email)) {
            return "Email inválido.";
        }
    };

    // Função para validar a idade
    const validateIdade = () => {
        if (user.idade <= 16) {
            return "Idade precisa ser maior que 16.";
        }
    };

    // Função para validar a senha
    const validatePassword = () => {
        const passwordRegex =
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,}$/;
        if (!passwordRegex.test(user.password)) {
            return "Senha precisa ter mais de 6 letras, um número e um caractere especial.";
        }
    };

    // Função para validar a confirmação de senha
    const validateConfirmPassword = () => {
        if (user.password !== user.confirmPassword) {
            return "As senhas não coincidem.";
        }
    };

    // Função para rodar todas as validações
    const validate = () => {
        const newErrors = {};
        newErrors.name = validateName();
        newErrors.email = validateEmail();
        newErrors.idade = validateIdade();
        newErrors.password = validatePassword();
        newErrors.confirmPassword = validateConfirmPassword();

        setErrors(newErrors);
        return Object.keys(newErrors).every((key) => !newErrors[key]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            props.onSubmitForm(user);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={"form"}>
            <h1>Criar usuário:</h1>
            <label htmlFor="name">Nome</label>
            <input
                type="text"
                placeholder="Nome do usuário"
                name="name"
                id="name"
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                value={user.name}
                data-testid="name-input"
            />
            {errors.name && <p className="error" data-testid="error-name">{errors.name}</p>} {/* Onde aparece o erro de nome */}


            <label htmlFor="email">Email</label>
            <input
                value={user.email}
                type="email"
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                placeholder="Email..."
                id="email"
                name="email"
                data-testid="email-input"
            />
            {errors.email && <p className="error" data-testid="error-email">{errors.email}</p>}

            <label htmlFor="idade">Idade</label>
            <input
                value={user.idade}
                type="number"
                onChange={(e) => setUser({ ...user, idade: parseInt(e.target.value) })}
                placeholder="Idade"
                id="idade"
                name="idade"
                data-testid="idade-input"
            />
            {errors.idade && <p className="error" data-testid="error-idade">{errors.idade}</p>}

            <label htmlFor="password">Senha</label>
            <input
                value={user.password}
                type="password"
                onChange={(e) => setUser({ ...user, password: e.target.value })}
                placeholder="Senha..."
                id="password"
                name="password"
                data-testid="password-input"
            />
            {errors.password && <p className="error" data-testid="error-password">{errors.password}</p>}

            <label htmlFor="confirmPassword">Confirmar Senha</label>
            <input
                value={user.confirmPassword}
                type="password"
                onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                placeholder="Confirme sua senha..."
                id="confirmPassword"
                name="confirmPassword"
                data-testid="confirmPassword-input"
            />
            {errors.confirmPassword && <p className="error" data-testid="error-confirmPassword">{errors.confirmPassword}</p>}

            <button data-testid="submit-button">Registrar</button>
        </form>
    );
}

export default RegisterForm;