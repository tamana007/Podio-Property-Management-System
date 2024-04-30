import ActionModel from "@/db/model/Actions";
import { connectToDatabase } from "@/db/model/db";
import { NextRequest, NextResponse } from "next/server";


export const POST=async(req:NextRequest)=>{
const data=await req.json();
connectToDatabase();
const mleadId=data.mleadId;
const leadAssignment=data.leadAssignment;
const disposition=data.disposition;
const createdBy=data.createdBy.createdBy;
const region=data.region;
const stageofLead=data.clicked.name;

// const newobj={leadId,leadAssignment,disposition,createdBy,region,stageofLead}
 // Create a new instance of the ActionModel with the data
 const newAction = new ActionModel({
  mleadId,
  leadAssignment,
  disposition,
  createdBy,
  region,
  stageofLead
});

console.log(data,'data from activity api::::::::::::::::::',data);
console.log(data,'stage of leacd from activity api::::::::::::::::::',stageofLead);

const sendTodab=await newAction.save()

return NextResponse.json({message:"Data sent suceed",newAction})

}