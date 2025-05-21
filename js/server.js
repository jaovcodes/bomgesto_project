import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { getDatabase, ref, set } from 'firebase/database';

const app = express();
app.use(cors());
app.use(bodyParser.json());

const firebaseConfig = {
  apiKey: "AIzaSyBPAy9KdIk8e34yruaL32wyj_MJANHlN2g",
  authDomain: "bomgesto-15634.firebaseapp.com",
  databaseURL: "https://bomgesto-15634-default-rtdb.firebaseio.com",
  projectId: "bomgesto-15634",
  storageBucket: "bomgesto-15634.firebasestorage.app",
  messagingSenderId: "672802069001",
  appId: "1:672802069001:web:356d0b5ab9ae09d29236d8"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getDatabase(firebaseApp);

app.post('/cadastro1', async (req, res) => {
  const { nome, email, senha, dataNascimento } = req.body;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
    const uid = userCredential.user.uid;

    await set(ref(db, `usuarios/${uid}`), {
      nome,
      email,
      dataNascimento,
      criadoEm: new Date().toISOString()
    });

    res.status(201).json({ mensagem: 'Usuário cadastrado com sucesso!' });
  } catch (erro) {
    res.status(400).json({ mensagem: erro.message });
  }
});

app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    await signInWithEmailAndPassword(auth, email, senha);
    res.status(200).json({ mensagem: 'Login realizado com sucesso!' });
  } catch (erro) {
    res.status(401).json({ mensagem: 'Email ou senha incorretos.' });
  }
});

app.post('/RS', async (req, res) => {
  const { email } = req.body;

  try {
    await sendPasswordResetEmail(auth, email);
    res.status(200).json({ mensagem: 'Email de recuperação enviado com sucesso!' });
  } catch (erro) {
    res.status(400).json({ mensagem: erro.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});