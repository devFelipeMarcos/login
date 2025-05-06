import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const signIn = async (e) => {
    e.preventDefault();

    try {
      const endpoint = "http://localhost:5000/login";
      const response = await axios.post(endpoint, {
        email,
        password,
      });
      const token = response.data.token;
      setToken(token);
      setRedirect(true);
    } catch (error) {
      const msgError = error.response.data.message;
      setErrorMessage(msgError);
    }
  };

  if (redirect) {
    return <Navigate to="/home" />;
  }

  let message;
  if (errorMessage) {
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Bem-vindo!</h1>
          <p className="text-gray-500">Faça login para continuar</p>
        </div>

        {message}
        <form onSubmit={signIn}>
          <div className="mb-5">
            <label className="block text-gray-700 mb-1" htmlFor="username">
              Email
            </label>
            <input
              id="username"
              type="text"
              placeholder="Seu email"
              value={email}
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
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Sua senha"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition"
          >
            Entrar
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link
            to="/register"
            className="text-blue-600 hover:underline text-sm"
          >
            Não tem conta? clique aqui para se registrar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
