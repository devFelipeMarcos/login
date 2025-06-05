
# 🔐 API com Autenticação JWT

API REST desenvolvida em Node.js utilizando Express, Prisma ORM e autenticação via JWT. Possui endpoints protegidos que requerem autenticação.

---

## 🚀 Tecnologias

- Node.js
- Express
- Prisma ORM + PostgreSQL (ou outro banco suportado)
- JWT (JSON Web Token)
- Bcrypt (hash de senhas)
- CORS
- Cookie-Parser
- Dotenv

---

## 📦 Instalação

### 1. Clone o projeto

```bash
git clone https://github.com/devFelipeMarcos/login.git
cd login
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o arquivo `.env`

Crie um arquivo `.env` na raiz do projeto e adicione as variáveis:

```env
DATABASE_URL="sua_string_de_conexao_do_prisma"
PORT=3000
SECRET_KEY="sua_chave_secreta_para_jwt"
```

### 4. Configure o Prisma

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 5. Execute o projeto

```bash
npm run dev
```

---

## 🔗 Endpoints

### ✅ Auth

| Método | Rota    | Descrição                    |
|--------|---------|-------------------------------|
| POST   | `/user` | Cria um novo usuário          |
| POST   | `/login`| Realiza login e gera o token  |

### 🔒 Rota Protegida

| Método | Rota      | Descrição                                |
|--------|-----------|-------------------------------------------|
| GET    | `/private`| Retorna dados protegidos (requer token)  |

---

## 🔑 Autenticação

Para acessar as rotas protegidas, é necessário adicionar no header:

```http
Authorization: Bearer <seu_token>
```

---

## 📄 Exemplo de Request para Login

```http
POST /login
Content-Type: application/json

{
  "email": "usuario@email.com",
  "password": "senha123"
}
```

### Resposta:

```json
{
  "success": true,
  "message": "Login realizado com sucesso!",
  "token": "<seu_token>"
}
```

---

## 🗄️ Banco de Dados (schema.prisma)

```prisma
model Login {
  id       Int    @id @default(autoincrement())
  name     String
  email    String @unique
  password String
  ip       String
}
```

---

## 📑 Documentação

A API possui uma interface de documentação interativa (como mostrado na imagem) com suporte para testes dos endpoints e autenticação via JWT.

---

## 👨‍💻 Desenvolvedor

- **Felipe Marcos**  
  🔗 [GitHub](https://github.com/devFelipeMarcos)  
  🔗 [LinkedIn](https://www.linkedin.com/in/felipemarcosbits/)  
  📂 [Repositório do Projeto](https://github.com/devFelipeMarcos/login)

---

## 🏁 Licença

Este projeto está licenciado sob a licença MIT.
