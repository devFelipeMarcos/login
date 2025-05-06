import React, { useState } from "react";
import { Link, Navigate } from "react-router";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [redirect, setRedirect] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const endpoint = "http://localhost:5000/user";
      const response = await axios.post(endpoint, {
        email,
        name,
        password,
      });
      const msgSuccess = response.data.message;
      setSuccessMessage(msgSuccess);
      setTimeout(() => {
        setRedirect(true);
      }, 2000);
    } catch (error) {
      const msgError = error.response?.data?.message || "Erro desconhecido!";
      setErrorMessage(msgError);
    }
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  let message;
  if (successMessage) {
    message = (
      <div
        className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50"
        role="alert"
      >
        <span className="font-medium">Sucesso:</span> {successMessage}
        redirecionando para a página de login!
      </div>
    );
  } else if (errorMessage) {
    message = (
      <div
        className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
        role="alert"
      >
        <span className="font-medium">Erro:</span> {errorMessage}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-700">
      <div className="bg-white shadow-2xl rounded-xl p-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Criar Conta</h1>
          <p className="text-gray-500">Preencha os campos para se registrar</p>
        </div>

        {/* Renderiza a mensagem de sucesso ou erro */}
        {message}

        <form onSubmit={submitForm}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="name">
              Nome completo
            </label>
            <input
              id="name"
              type="text"
              placeholder="Seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              value={email}
              placeholder="Seu e-mail"
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-1" htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              value={password}
              type="password"
              placeholder="Crie uma senha"
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition"
          >
            Registrar
          </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-gray-600 text-sm">
            Já tem uma conta?{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              Entrar
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Register;
