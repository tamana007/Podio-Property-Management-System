import { connectToDatabase } from "@/db/model/db";
import Webform from "@/db/model/Webform";
import { NextRequest, NextResponse } from "next/server";


export const GET=async(req:NextRequest)=>{
  connectToDatabase()
  const leads=await Webform.find()
  // console.log('leads came form db',leads);

  if (leads) {
    return NextResponse.json({message:"no leads exist",leads})
    
  }
  else{

  return NextResponse.json({message:"received",leads})

  }


}