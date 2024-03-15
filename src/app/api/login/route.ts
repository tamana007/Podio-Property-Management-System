import {connectToDatabase} from '@/db/model/db'
// import User from '@/db/model/User';
import UserReg from '@/db/model/User'
import { NextResponse, NextRequest } from 'next/server';
import { use } from 'react';





export const POST=async(NextRequest:NextResponse)=>{
  await connectToDatabase();
const body=await NextRequest.json();
const email=body.email;
console.log("email", email)
const password=body.password;

//Check Database
const checkEmail=await UserReg.findOne({email})
// const dbemail= checkEmail?.email;
// const id=checkEmail?._id;
// const dbPass=checkEmail?.password;
// const checkPassword=await UserReg.findOne({email});
console.log('db email -----------------',checkEmail);

if(checkEmail){
// if (!checkEmail || !password || dbPass !== password) {
  return NextResponse.json('hiii');
  // return NextResponse.status(400).send({ message: "User already exists" });
}
else{
  return NextResponse.json("bye");
}

// export const POST = async (NextRequest: NextResponse) => {
//   await connectToDatabase()

//   const body = await NextRequest.json();
//   const email = body.email;
//   const password = body.password;

//   // Check Database
//   const user = await UserReg.findOne({ email });
//   // const id=user?._id;
//   const dbemail=user?.email;
//   console.log('db emai',dbemail);
  
  // const dbPass=user?.password;

  // if (!user || (user.email !== email || user.password !== password)) {
    // return NextResponse.json('Invalid email or password');
    // console.log('not found,,,,,,,,,,,,,,,,,,,,,,,,,,,,',email);
    
//   // }
//   if (!dbemail) {
// // console.log('checkEmail.......................... founded Okay',id);
// // console.log('email,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,',dbemail);
// // console.log('passowrd...................................',dbPass);
// console.log('wright--------------------------------------------------------------');

    
//   }
  // else{
  //   NextResponse.json({'Finaly':user})
  //   // console.log('founded');
    
  // }





  
  


}