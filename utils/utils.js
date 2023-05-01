const jwt = require("jsonwebtoken");

const ONE_DAY = 1000 * 60 * 60 * 24;

const createJWT = async (tokenUser) => {
  return await jwt.sign(tokenUser, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

const isTokenValid = async token => jwt.verify(token, process.env.JWT_SECRET);

const attachCookiesToResponse = async (res, tokenUser) => {
  const token = await createJWT(tokenUser);
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + ONE_DAY) ,
    secure:process.env.NODE_ENV === 'production',
    signed:true,
  });

  res.status(200).json({ user: tokenUser });
};

module.exports = {
  createJWT,
  isTokenValid,
  attachCookiesToResponse,
};
