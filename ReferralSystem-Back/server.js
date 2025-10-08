import express from "express";
import pkg from "@prisma/client";
import cors from "cors";
import crypto from "crypto";
import bcrypt from "bcryptjs"; // ← ADICIONE ESTA LINHA

const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const app = express();

app.use(cors())
app.use(express.json());

// CADASTRO - Criptografa a senha
app.post("/usuarios", async (req, res) => {
  const senhaHash = await bcrypt.hash(req.body.senha, 10); // ← Criptografa aqui
  
  const user = await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      senha: senhaHash, // ← Salva o hash
      codigoRef: gerarCodigoRef(),
    },
  });
  
 
  const { senha, ...userSemSenha } = user;
  res.status(201).json(userSemSenha);
});


app.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  
  const user = await prisma.user.findUnique({
    where: { email }
  });
  
  if (!user) {
    return res.status(401).json({ error: "Email ou senha inválidos" });
  }
  
  const senhaValida = await bcrypt.compare(senha, user.senha);
  
  if (!senhaValida) {
    return res.status(401).json({ error: "Email ou senha inválidos" });
  }
  
  const { senha: _, ...userSemSenha } = user;
  res.json({ message: "Login realizado com sucesso", user: userSemSenha });
});

app.get("/usuarios", async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).json(users);
});

// UPDATE - Criptografa se enviar senha nova
app.put("/usuarios/:id", async (req, res) => {
  const dataToUpdate = {
    email: req.body.email,
    name: req.body.name,
    pontos: req.body.pontos,
  };

  // Só criptografa se a senha foi enviada
  if (req.body.senha) {
    dataToUpdate.senha = await bcrypt.hash(req.body.senha, 10);
  }

  await prisma.user.update({
    where: {
      id: req.params.id
    },
    data: dataToUpdate
  });   
  res.status(201).json(req.body);
});

app.delete("/usuarios/:id", async (req, res) => {
  await prisma.user.delete({
    where: {
      id: req.params.id,
    },
  });
  res.status(200).json({message: "Usuario deletado com sucesso!"});
});

function gerarCodigoRef() {
  return crypto.randomBytes(4).toString("hex");
}



app.listen(3000, () => console.log("Servidor rodando na porta 3000"));