import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import cors from "cors";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
const { PORT } = process.env;
const { SECRET_KEY } = process.env;
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
const db = new PrismaClient();

const generateHash = async (password) => {
  return bcrypt.hash(password, 12);
};

app.get("/", async (req, res) => {
  const allUsers = await db.login.findMany();
  res.status(200).json(allUsers);
});

//ROUTE TO CREATE USER
app.post("/user", async (req, res) => {
  const { name, email, password } = req.body;
  const ip = req.ip;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      error: "incomplete arguments",
    });
  }

  const verifyUser = await db.login.findFirst({
    where: {
      email,
    },
  });

  if (verifyUser) {
    return res.status(400).json({
      success: false,
      message: "Esse e-mail já está cadastrado!",
    });
  }

  const hashPass = await generateHash(password);
  const newUser = await db.login.create({
    data: {
      email,
      name,
      password: hashPass,
      ip: ip || "Erro ao capturar o IP",
    },
  });

  return res.status(201).json({
    success: true,
    message: "Usuário criado com sucesso!",
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: "incomplete arguments",
    });
  }

  const verifyUser = await db.login.findFirst({
    where: {
      email,
    },
  });

  if (!verifyUser) {
    return res.status(401).json({
      success: false,
      message: "E-mail não encontrado",
    });
  }

  const validatePass = await bcrypt.compare(password, verifyUser.password);

  if (!validatePass) {
    return res.status(401).json({
      success: false,
      message: "E-mail ou senha incorreta!",
    });
  } else {
    const payload = {
      id: verifyUser.id,
      name: verifyUser.name,
      email: verifyUser.email,
    };
    const token = jwt.sign(payload, SECRET_KEY);

    res.cookie("TOKEN", token).status(200).json({
      success: true,
      message: "Login realizado com sucesso!",
      token: token,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
