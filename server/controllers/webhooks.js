export const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        const payload = req.body.toString("utf8") // 👈 convert buffer to string
        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        }

        const evt = await whook.verify(payload, headers)

        const { data, type } = evt

        switch (type) {
            case 'user.created': {
                const userData = {
                    _id: data.id,
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    imageUrl: data.image_url,
                }
                await User.create(userData)
                res.json({})
                break;
            }

            case 'user.updated': {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    name: data.first_name + " " + data.last_name,
                    imageUrl: data.image_url,
                }
                await User.findByIdAndUpdate(data.id, userData)
                res.json({})
                break;
            }

            case 'user.deleted': {
                await User.findByIdAndDelete(data.id)
                res.json({})
                break;
            }

            default:
                res.json({})
        }
    } catch (error) {
        console.error("Webhook error:", error.message)
        res.status(400).json({ success: false, message: error.message })
    }
}
