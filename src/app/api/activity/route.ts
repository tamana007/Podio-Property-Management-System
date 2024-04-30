import ActionModel from "@/db/model/Actions";
import { connectToDatabase } from "@/db/model/db";
import { NextRequest, NextResponse } from "next/server";


export const POST=async(req:NextRequest)=>{
const data=await req.json();
connectToDatabase();
const leadId=data.mleadId;
const leadAssignment=data.leadAssignment;
const disposition=data.disposition;
const createdBy=data.createdBy.createdBy;
const region=data.region;
const stageofLead=data.stageofLead;


const newData=await new ActionModel({
  leadId,leadAssignment,disposition,createdBy,region,stageofLead
})

console.log(data,'data from activity api::::::::::::::::::',data,);
// console.log('newa data---------------------',newData,'id-------------',newData.mleadId);

// console.log(data,'stage of leacd from activity api::::::::::::::::::',stageofLead);

const sendTodab=await newData.save()

return NextResponse.json({message:"Data sent suceed",data})

}