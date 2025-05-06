import React from "react";
import { Link } from "react-router-dom";

const Home = ({ token }) => {
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const tokenCookie = getCookie("TOKEN");
  const tokenb = token || tokenCookie;

  return (
    <div className="p-4">
      {tokenb ? (
        <div>
          <h1 className="text-2xl font-bold">Bem-vindo à página inicial!</h1>
          <p>A sua sessão está ativa.</p>
          <p>Token JWT: {tokenb}</p>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-bold">Bem-vindo!</h1>
          <p>Você não está autenticado.</p>
          <Link to="/login" className="text-blue-600 hover:underline">
            Faça login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
