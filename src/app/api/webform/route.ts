import { connectToDatabase } from "@/db/model/db";
import Webform from "@/db/model/Webform";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  await connectToDatabase();
  const data = await request.json();
  // const url=new URL(request.url);
  // const user=url.searchParams.get("createdBy")
  // console.log('user from add lead detected',user);
  

  try {
    const sendtoDb = await new Webform(data).save();

    if (sendtoDb) {
      console.log(" Suceed sendt to db-------------------------------------");
    }
  } catch (error) {
    console.log("error", error);
  }
  return NextResponse.json({ message: "done" }, { status: 200 });
};
