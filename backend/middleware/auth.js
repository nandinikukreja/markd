import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if(!token)
        return res.status(401).json({ message: "Access Denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const currentAgent = req.headers["user-agent"];
        const currentIp = req.ip;

        if(decoded.userAgent !== currentAgent || decoded.ip !== currentIp) 
            return res.status(401).json({ message: "Invalid Token" });

        req.user = decoded;
        next();
    }
    catch(err) {
        console.log(err);
        res.status(403).json({ message: "Invalid Token" });
    }
}

export default auth;