//USING NEXTJS VERSION 13
import { Padauk } from 'next/font/google';
import { NextResponse, NextRequest } from 'next/server';

// export const GET = async () => {
//   return NextResponse.json({ message: 'Hello, Next.js Version 13!' }, { status: 200 });
// };

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const email=body.email;
  const userName=body.username;
  const password=body.password;


  
  

  // Do something

  return NextResponse.json({ message: 'Operation successful' }, { status: 200 });
};

