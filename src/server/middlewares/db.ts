import mongoose from 'mongoose';
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';

export const connectDb = (handler: NextApiHandler) => async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (mongoose.connections[0].readyState) {
    console.info('Already connected to mongoose');
    return handler(req, res);
  }
  // Using new database connection
  console.info('Connecting to mongoose...');
  // @ts-ignore
  const conn = await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });

  // const Schema = mongoose.Schema;
  // var AvastarUbObject = new Schema({
  //   _id: Number,
  //   ub2List: [
  //     {
  //       type: String,
  //     },
  //   ],
  //   ub3List: [
  //     {
  //       type: String,
  //     },
  //   ],
  // });

  // var avastar = mongoose.model('AvaUbCollection', AvastarUbObject);
  // console.log(avastar);
  // await avastar.find((err, document) => {
  //   console.log(document);
  // });

  return handler(req, res);
};
