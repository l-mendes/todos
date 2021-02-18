import { connectToDatabase } from '../../../utils/mongodb';
import withSession from '../../../utils/session';
import { ObjectId } from "mongodb";

const handler = withSession(async (req, res) => {
  return new Promise(async (resolve, reject) =>{
    const user = req.session.get("user");
    const { method } = req;

    if (!user) {
      res.status(403).json({success: false, message: "Acesso negado!"});
      reject(false);
    }

    if(method !== 'POST'){
      res.status(401).json({sucess: false, message: `Método ${method} não permitido!`});
      reject(false);
    }

    const { name, description, dt_todo, done } = req.body;

    const { db } = await connectToDatabase();

    db.collection('todos').insertOne({
      name,
      description,
      dt_todo,
      done,
      "user_id": ObjectId(user._id),
      "created_at": new Date(),
      "updated_at": new Date()
    }, (err, result) => {
      if(err) {
        res.status(401).json({sucess: false, message: error});
        reject(false);
      } else {
        let dataResp = {
          success: true,
          message: 'OK!',
          data: result.ops[0]
        };
        res.status(201).json(dataResp);
        resolve(dataResp);
      }
    });
  });
});

export default handler;