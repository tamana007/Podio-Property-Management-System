import { connectToDatabase } from "@/db/model/db";
import Comment from "@/db/model/Comment";
// import commentSchema
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  await connectToDatabase();
  //Attention here must be req.json not req.body----
  const comment = await req.json();
  // console.log("req------------------------", comment);

  console.log("coment receive to api", comment);

  
   // connectToDatabase
   const savetoDb = await new Comment(comment).save();
   if (savetoDb) {
     console.log("saved to db");
     return NextResponse.json({ message: "saved to db" });
   }
 else{
   return NextResponse.json({ message: "error saving data" });
 
 }

  // if (!comment) {
  //   return NextResponse.json({ message: "issue receiving comment" });
  // } else {
  //   return NextResponse.json({ message: "received" });
    
  // }

 
};
