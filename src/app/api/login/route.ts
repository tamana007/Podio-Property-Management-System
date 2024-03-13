import {connectToDatabase} from '@/db/model/db'
// import User from '@/db/model/User';
import UserReg from '@/db/model/User'
import { NextResponse, NextRequest } from 'next/server';





export const POST=async(NextRequest:NextResponse)=>{
  await connectToDatabase()
const body=await NextRequest.json();
const email=body.email;
const password=body.password;

//Check Database
const checkEmail=await UserReg.findOne({email});
if (!checkEmail) {
  return NextResponse.json('user not found********************')
  
}
console.log('checkEmail.......................... founded');




  
  


}