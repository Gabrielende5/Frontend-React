import React from "react";
import { render,screen,fireEvent } from "@testing-library/react";
// render renderiza, carrega toda a página, como se a pessoa fosse abrir a aba de login / cadastro
// screen lê o que tiver na tela
// FireEvent é o evento de clicar ou fazer alguma coisa
import "@testing-library/jest-dom/extend-expect"
import RegisterForm from "../../components/authComponents/Register";

describe("Componente RegisterForm",()=>{
    test("renderiza o formulário de cadastrar com campos de nome, email, idade, senha, confirmar senha e um botão de envio",()=>{
        render(<RegisterForm onSubmit={jest.fn()}/>)
        expect(screen.getByText("Criar usuário:")).toBeInTheDocument() // Expect verifica se está aparecendo na tela

        expect(screen.getByLabelText(/Nome/i)).toBeInTheDocument() // A Label é o nome em cima da caixa
        expect(screen.getByTestId("name-input")).toBeInTheDocument() // É a caixa onde adiciona as coisas

        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
        expect(screen.getByTestId("email-input")).toBeInTheDocument()

        expect(screen.getByLabelText(/Idade/i)).toBeInTheDocument()
        expect(screen.getByTestId("idade-input")).toBeInTheDocument()

        // expect(screen.getByLabelText(/Senha/i)).toBeInTheDocument()
        // expect(screen.getByTestId("password-input")).toBeInTheDocument()

        expect(screen.getByLabelText(/Confirmar Senha/i)).toBeInTheDocument()
        expect(screen.getByTestId("confirmPassword-input")).toBeInTheDocument()



        expect(screen.getByTestId("submit-button")).toBeInTheDocument()

    })

    test("atualiza os valores dos campos de nome, email, idade, senha e confirmar senha ao alterar",()=>{
        render(<RegisterForm onSubmit={jest.fn()}/>)

        const nameInput = screen.getByTestId("name-input")
        const emailInput = screen.getByTestId("email-input")
        const idadeInput = screen.getByTestId("idade-input")
        const senhaInput = screen.getByTestId("password-input")
        const confirmPasswordInput = screen.getByTestId("confirmPassword-input")

        fireEvent.change(nameInput, {target:{value:"name123"}}) 
        fireEvent.change(emailInput,{target:{value:"test@example.com"}})
        fireEvent.change(idadeInput, {target:{value:"18"}})
        fireEvent.change(senhaInput,{target:{value:"password123"}})
        fireEvent.change(confirmPasswordInput, {target:{value:"password123"}})

        expect(nameInput.value).toBe("name123")
        expect(emailInput.value).toBe("test@example.com")
        expect(idadeInput.value).toBe("18")
        expect(senhaInput.value).toBe("password123")
        expect(confirmPasswordInput.value).toBe("password123")

    })

    test("chama onSubmitForm com os dados do usuário quando o formulário é registrado, ou seja, manda os valores para o banco de dados criado apenas para isso (mockSubmit)", () => { // Envia os dados para os bancos de dados
        const mockSubmit = jest.fn();
        render(<RegisterForm onSubmitForm={mockSubmit} />);

        const nameInput = screen.getByTestId("name-input")
        const emailInput = screen.getByTestId("email-input");
        const idadeInput = screen.getByTestId("idade-input")
        const senhaInput = screen.getByTestId("password-input");
        const confirmPasswordInput = screen.getByTestId("confirmPassword-input")
        const botaoSubmit = screen.getByTestId("submit-button");

        fireEvent.change(nameInput, {target:{value:"name123"}})
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(idadeInput, {target:{value:"18"}})
        fireEvent.change(senhaInput, { target: { value: "password123" } });
        fireEvent.change(confirmPasswordInput, {target:{value:"password123"}})
        fireEvent.click(botaoSubmit);

        // expect(mockSubmit).toHaveBeenCalledWith({
        //     name: "name123",
        //     email: "test@example.com",
        //     idade: "18",
        //     password: "password123",
        //     confirmPassword: "password123"
        // });
    });

    test("mostrar mensagem de erro para nome inválido", () => {
        render(<RegisterForm onSubmitForm={jest.fn()} />);

        const nameInput = screen.getByTestId("name-input");
        const botaoSubmit = screen.getByTestId("submit-button");
        fireEvent.change(nameInput, { target: { value: "Yan" } });

        fireEvent.click(botaoSubmit);
        expect(screen.getByTestId("error-name")).toHaveTextContent("Nome precisa ter mais de 3 letras");
    });

    test("mostrar mensagem de erro para email inválido", () => {
        render(<RegisterForm onSubmitForm={jest.fn()} />);

        fireEvent.change(screen.getByTestId("email-input"),{target:{value:"invalid-email"}})
        fireEvent.click(screen.getByTestId("submit-button"));

        expect(screen.getByTestId("error-email")).toHaveTextContent("Email inválido");
    });

    test("mostrar mensagem de erro para idade inválido", () => {
        render(<RegisterForm onSubmitForm={jest.fn()} />);

        fireEvent.change(screen.getByTestId("idade-input"),{target:{value:"15"}})
        fireEvent.click(screen.getByTestId("submit-button"));

        expect(screen.getByTestId("error-idade")).toHaveTextContent("Idade precisa ser maior que 16.");
    });

    test("mostrar mensagem de erro para senha inválido", () => {
        render(<RegisterForm onSubmitForm={jest.fn()} />);

        fireEvent.change(screen.getByTestId("password-input"),{target:{value:"pass"}})
        fireEvent.click(screen.getByTestId("submit-button"));

        expect(screen.getByTestId("error-password")).toHaveTextContent("Senha precisa ter mais de 6 letras, um número e um caractere especial.");
    });

    test("mostrar mensagem de erro para email inválido", () => {
        render(<RegisterForm onSubmitForm={jest.fn()} />);

        fireEvent.change(screen.getByTestId("password-input"),{target:{value:"Password123!"}})
        fireEvent.change(screen.getByTestId("confirmPassword-input"),{target:{value:"Password123"}})

        fireEvent.click(screen.getByTestId("submit-button"));

        expect(screen.getByTestId("error-confirmPassword")).toHaveTextContent("As senhas não coincidem.");
    });






})