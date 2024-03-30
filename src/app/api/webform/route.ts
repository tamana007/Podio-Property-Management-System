import {connectToDatabase} from '@/db/model/db'
// import WebForm from '@/app/webform/page'
import WebForm from '@/db/model/User';
import { NextRequest,NextResponse } from 'next/server'

export const POST=async(request: NextRequest)=>{
  // console.log('enitereeeeeeeeeeeeeee',NextRequest);
  await connectToDatabase();
  const data=await request.json();
  const webform=data.allData;

  // const savetoDv=new WebForm(webform).save();
  const sendtoDb=new WebForm(webform).save()
  // console.log('sepecifis data',webform);
  
  // console.log('------------------------data',data);
  return NextResponse.json({message:"done"},{status:200})
 
}