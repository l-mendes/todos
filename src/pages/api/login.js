import { connectToDatabase } from '../../utils/mongodb';
import bcrypt from 'bcryptjs';
import withSession from '../../utils/session';

const handler = withSession(async (req, res) => {
  try {
    const { method } = req;

    const { email, password } = req.body;

    if (method !== 'POST') {
      res.setHeader('Allow', ['POST']);
      res.status(405).json({success: false, message: `Método ${method} não autorizado`});
    }

    if (!email || !password) {
      res.status(422).json({success:false, message: "Por favor preencha todos os campos"});
    }

    const { db } = await connectToDatabase();

    const user = await db.collection('users').findOne({"email": `${email}`});

    if (!user) {
      res.status(404).json({success: false, message: "Usuário não encontrado"});
    }

    const validation = await bcrypt.compare(password, user.password);

    user.isLoggedIn = true;
    delete user.password;

    if (validation) {
      req.session.set("user", user);
      await req.session.save();
      res.status(201).json(user);
    } else {
      res.status(401).json({success:false, message: "Credenciais inválidas"});
    }

  } catch (error) {
    const { response: fetchResponse } = error;
    console.log(error.data);
    res.status(fetchResponse?.status || 500).json(error.data);
  }
});

export default handler;