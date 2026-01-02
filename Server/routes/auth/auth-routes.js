const express = require("express");
const { register,login,logout,authMiddleware } = require("../../controllers/auth/auth-controller");
const router = express.Router();
router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

router.get("/checkauth", authMiddleware,(req,res)=>{
    const user=req.user;
    res.status(200).json({
        success:true,
        message:'User is Authenticted',
        user
    })
});


module.exports=router;