import {connectToDatabase} from '@/db/model/db'
// import WebForm from '@/app/webform/page'
// import WebForm from '@/db/model/User';
import Webform from '@/db/model/Webform';
import { NextRequest,NextResponse } from 'next/server'

export const POST=async(request: NextRequest)=>{
  await connectToDatabase();
  const data=await request.json();
  const webform=data.allData;


  const sendtoDb=await new Webform(webform).save()

  if(sendtoDb){
    console.log('sendt to db-------------------------------------',sendtoDb);
    
  }
  console.log('sepecifis data',webform);
  
  // console.log('------------------------data',data);
  return NextResponse.json({message:"done"},{status:200})
 
}