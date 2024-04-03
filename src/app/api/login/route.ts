import {connectToDatabase} from '@/db/model/db'
// import User from '@/db/model/User';
import UserReg from '@/db/model/User'
import { NextResponse, NextRequest } from 'next/server';
import { use } from 'react';





export const POST=async(request:NextRequest)=>{
  await connectToDatabase();
const body=await request.json();
const emailFromUI=body.email;
const passwordFromUI=body.password;
// const userId=request.url;

console.log('check UI user and passwoed',emailFromUI,passwordFromUI);


//Check Database
// const checkEmail=await UserReg.findOne({passwordFromUI})
const checkEmail = await UserReg.findOne({ email: emailFromUI });

const dbemail= await checkEmail?.email;
const id=await checkEmail?._id;
const dbPass=await checkEmail?.password;



// if(checkEmail){
  if (!checkEmail || (checkEmail.email !== emailFromUI || checkEmail.password !== passwordFromUI)) {
    
    console.log('not found,,,,,,,,,,,,,,,,,,,,,,,,,,,,',emailFromUI);
    // console.log('user IDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD',userId);
    
    // console.log('email from user.......................................',emailFromUI);
    // console.log('password from user.......................................',passwordFromUI);
    // console.log('everything form db.......................................',checkEmail);

    // console.log('email from db.......................................',dbemail);
    // console.log('password from db.......................................',dbPass);

}
else{
  return NextResponse.json({message:"suceed",id});
  // console.log('found it suceed....................................................................................');
  
}


  
  


}