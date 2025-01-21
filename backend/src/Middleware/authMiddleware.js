const jwt=require('jsonwebtoken');

const authMiddleware=(req,res,next)=>{
    console.log("Headers: ", req.headers);

    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log("Authorization header is missing");
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(' ')[1];
    
    if(!token){
        console.log("Token is missing in the Authorization header");

        return res.status(401).json({ message: "Unauthorized" });
    }
try {
    const decodedToken=jwt.verify(token,process.env.JWT_SECRET_KEY)
    console.log("decodedToken in authMiddleware⌚",decodedToken)
    req.user=decodedToken;
    next();
} catch (error) {
    return res.status(403).json({ message: "Forbidden: Invalid token" });
}
 
}


module.exports=authMiddleware