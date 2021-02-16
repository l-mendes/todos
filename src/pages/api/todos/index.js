import { connectToDatabase } from '../../../utils/mongodb';
import withSession from '../../../utils/session';
import { ObjectId } from "mongodb";

const handler = withSession(async (req, res) => {
  try {
    const user = req.session.get("user");
    const { method } = req;

    if (!user) {
      res.status(403).json("Não Autorizado!");
      res.end();
    } 
    
    if (method !== 'GET') {
      res.status(401).json(`Método ${method} inválido!`);
      res.end();
    }else {
      const { db } = await connectToDatabase();

      const todos = await db.collection('todos').find({"user_id": ObjectId(user._id)}).toArray();

      res.status(200).json(todos);
    }

  } catch (error) {
    const { response: fetchResponse } = error;
    console.log(error.data);
    res.status(fetchResponse?.status || 500).json(error.data);
  }
});

export default handler;