const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    //   get the token from the authorization header
    const token = await req.headers.authorization.split(" ")[1];
    console.log(token);
    //check if the token matches the supposed origin
    const decodedToken = await jwt.verify(token, "RANDOM-TOKEN");
    console.log(decodedToken);
    // retrieve the user details of the logged in user
    const user = await decodedToken;
    console.log(user);
    // pass the user down to the endpoints here
    if (!decodedToken) {
      res.status(401).json({
        message: "Invalid request!",
      });
    }
    req.user = user;

    // pass down functionality to the endpoint
    next();
  } catch (error) {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
