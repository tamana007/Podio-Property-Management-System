import { connectToDatabase } from "@/db/model/db";
import Comment from "@/db/model/Comment";
// import commentSchema
import { NextRequest, NextResponse } from "next/server";


export const POST = async (req: NextRequest) => {
  await connectToDatabase();
  //Attention here must be req.json not req.body----
  const commentresult = await req.json();
  // console.log("req------------------------", comment);

  console.log("coment receive to api", commentresult);

  // Create a new Comment document
  const newComment = new Comment({
    commenter: commentresult.commenter || "user", // Set default commenter if not provided
    time: commentresult.time || new Date(), // Set default time if not provided
    comment: commentresult.comment,
    mleadId: commentresult.mleadId,
    // mleadId:commentresult.mleadId,
  });
  // console.log("coment receive to ap new000000000000000000i", newComment);

  // connectToDatabase
  const savetoDb = await newComment.save();
  if (savetoDb) {
    // console.log("saved to db New--------------------------------", newComment);
    return NextResponse.json({ message: "saved to db", commentresult });
  } else {
    return NextResponse.json({ message: "error saving data" });
  }
};

// GET endpoint to retrieve all comments
export const GET = async (req: NextRequest) => {
  await connectToDatabase();

  // const {mleadId}=await req.body.json()
  // const res =await  req.body.json();
  const url = new URL( req.url);
  const id=url.searchParams.get("id")
  
  // console.log('gotten id..........................................',url);
  // console.log('id--------------',id);
  
  

  try {
    // Retrieve all comments from the database
    const comments = await Comment.find({mleadId:id});

    // Return success response with comments
    // console.log("Retrieved comments from database:", comments);
    return NextResponse.json(comments);
  } catch (error) {
    // Return error response
    console.error("Error retrieving comments:", error);
    return NextResponse.json({ message: "Error retrieving comments", error });
  }
};
