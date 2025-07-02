const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userCtrl = {
    register: async (req, res) => {
        // res.json({msg:"Test Controllers"})
        try {
            const { name, email, password } = req.body;

            const user = await Users.findOne({ email });

            if (user) return res.status(400).json({ msg: "Email already registered" })

            if (password.length < 6)
                return res.status(400).json({ msg: "Password length is at least 6 character" })

            // haspassword
            const passwordHash = await bcrypt.hash(password, 10)

            const newUser = new Users({
                name, email, password: passwordHash
            })
            await newUser.save()

            // create jwt token
            const accesstoken = createAccessToken({ id: newUser._id })
            const refershtoken = createRefershToken({ id: newUser._id })

            res.cookie('refershtoken',refershtoken,{
                httpOnly:true,
                path:'/user/refresh_token'
            })

            res.json({ accesstoken })

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    refershtoken:async(req,res) => {
        try {
            const rf_token = req.cookies.refershtoken;

            if(!rf_token) return res.status(400).json({msg:"Please Login or Register"});

            jwt.verify(rf_token,process.env.REFRESH_TOKEN_SECERT,(err,user) => {
                
                if(err) return res.status(400).json({msg:"Please Login or Register"})
                const accesstoken = createAccessToken({id:user.id})
                res.json({user,accesstoken})
            })

        } catch (err) {
            return res.status(500).json({msg:err.message})
        }
        
    }
}
const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECERT, { expiresIn: '1d' })
}
const createRefershToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECERT, { expiresIn: '7d' })
}
module.exports = userCtrl
