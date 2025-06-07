import { Webhook } from "svix";
import User from "../models/User.js";

// api controller fuction

const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

         const headers ={
            "svix-id": req.headers['svix-id'],
            "svix-timestamp": req.headers['svix-timestamp'],
            "svix-signature": req.headers['svix-signature'],
        };
        
        await whook.verify(JSON.stringify(req.body), headers);
        

        const {data, type} = req.body

         const userData = {
            _id: data.id,
            name: data.first_name + ' ' + data.last_name,
            email: data.email_addresses[0].email_address,
            imageUrl: data.image_url,
    }
        switch (type) {
            case 'user.created': {
               
                await User.create(userData);
                break;
            }

            case 'user.updated' : {
               
                await User.findByIdAndUpdate(data.id, userData);
                break;
            }

            case 'user.deleted' : {
                await User.findByIdAndDelete(data.id);
                break;
            }
            default:
                break;
        }
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

export default clerkWebhooks
