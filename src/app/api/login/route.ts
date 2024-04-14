import { connectToDatabase } from "@/db/model/db";
// import User from '@/db/model/User';
import UserReg from "@/db/model/User";
import { NextResponse, NextRequest } from "next/server";
import { use } from "react";

export const POST = async (request: NextRequest) => {
  await connectToDatabase();
  const body = await request.json();
  const emailFromUI = body.email;
  const passwordFromUI = body.password;
  // const userId=request.url;

  // console.log("check UI user and passwoed", emailFromUI, passwordFromUI);

  //Check Database

  const checkEmail = await UserReg.findOne({ email: emailFromUI });
  const userId = checkEmail._id;
  // console.log("entire---------------------------", checkEmail);

  const dbemail = await checkEmail?.email;
  const id = await checkEmail?._id;
  const dbPass = await checkEmail?.password;

  // if(checkEmail){
  if (
    !checkEmail ||
    checkEmail.email !== emailFromUI ||
    checkEmail.password !== passwordFromUI
  ) {
    // console.log("not found,,,,,,,,,,,,,,,,,,,,,,,,,,,,", emailFromUI);
    return NextResponse.json({message:"failed attempt--Wrong email or password",id})
  } else {
    return NextResponse.json({ message: "suceed", id });
  }
};
