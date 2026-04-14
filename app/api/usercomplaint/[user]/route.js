import ComplaintForm from "@/app/schema/ComplaintForm.model";
import { connectDB } from "@/app/lib/db";


export async function GET(req,{params}){
    const {user}= await params;

    try{
        connectDB();
        const usersForm = await ComplaintForm.find({ user: { $eq: user } });
        if(usersForm){
        return new Response(JSON.stringify({forms:usersForm,message:"The users complaints"}),{status:200});
        }else{
                return new Response(JSON.stringify({message:"No Compaint data available."}),{status:200});
        }

    }catch(error){
        return new Response({status:500},JSON.stringify({message:error.message}))
    }   

}