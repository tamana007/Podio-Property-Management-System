import {connectToDatabase} from '@/db/model/db'
import WebForm from '@/app/webform/page'
import { NextRequest,NextResponse } from 'next/server'

export const POST=async(NextRequest:NextResponse)=>{
  await connectToDatabase()
  // const saveWebform=await WebForm.Save()
}