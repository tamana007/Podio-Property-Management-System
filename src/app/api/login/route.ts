import { NextResponse, NextRequest } from 'next/server';
import {connectToDatabase} from '@/db/model/db'



export const POST=async(NextRequest:NextResponse)=>{
const body=await NextRequest.json();
const email=body.email;
const password=body.password;



  
  


}