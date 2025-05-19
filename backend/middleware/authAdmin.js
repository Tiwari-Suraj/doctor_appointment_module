import { json } from 'express';
import jwt from 'jsonwebtoken'


// admin  authentivation middleware

const authAdmin = async (req, res, next) => {
    try {

        const { atoken } = req.headers
        if (!atoken) {
            return res.json({ success: false, message: "Not Authorized login again" })
        }
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET)
        console.log(token_decode);
        if (token_decode.email !== process.env.ADMIN_EMAIL) {
            return res.json({ success: false, message: "Not Authorized login again" })
        }

        next()
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });

    }
}
export default authAdmin