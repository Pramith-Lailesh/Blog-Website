import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    // const code = token.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "token is missing" });
    }
    const user = jwt.verify(token, process.env.SECRET_KEY);
    req.existingUser = user;
    if (!user) {
      return res.status(403).json({ msg: "invalid token" });
    }
    next();
  } catch (error) {
    res.status(404).json("unauthorized user");
  }
};
