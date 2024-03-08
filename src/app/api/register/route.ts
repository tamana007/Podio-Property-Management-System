//USING NEXTJS VERSION 13
import {connectToDatabase} from '@/db/model/db'
import UserReg from '@/db/model/User';
import { Padauk } from 'next/font/google';
import { NextResponse, NextRequest } from 'next/server';

// export const GET = async () => {
//   return NextResponse.json({ message: 'Hello, Next.js Version 13!' }, { status: 200 });
// };

export const POST = async (request: NextRequest) => {
  await connectToDatabase();

  const body = await request.json();
  const email=body.email;
  const username=body.username;
  const password=body.password;
  const data={username,password,email};
  console.log('data checking',data);
  
  

  const sendtoDB= new UserReg(data).save();
// console.log('send to db',sendtoDB);


  // Send USER Credentials to Db
  return NextResponse.json({ message: 'Operation successful' }, { status: 200 });
};

