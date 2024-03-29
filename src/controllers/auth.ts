import User from "../models/user_model";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const defaultPass = "123456789";
function sendError(res: Response, error: string) {
  res.status(400).send({
    err: error,
  });
}

const register = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  if (email == null || password == null || name == null) {
    return sendError(res, "please provide valid email and password and name");
  }

  try {
    const user = await User.findOne({ email: email });
    if (user != null) {
      return sendError(res, "user already registered, try a different email");
    }

    const salt = await bcrypt.genSalt(10);
    const encryptedPwd = await bcrypt.hash(password, salt);
    const newUser = new User({
      name: name,
      email: email,
      password: encryptedPwd,
    });
    console.log(newUser);
    await newUser.save();
    return res.status(200).send({
      email: email,
      _id: newUser._id,
    });
  } catch (err) {
    return sendError(res, "fail to creat new user");
  }
};

async function changeUserPassword(req: Request, res: Response) {
  const { id } = req.params;
  const { newPassword, oldPassword } = req.body;

  if (!newPassword || !oldPassword) {
    return res.status(400).send({
      msg: "data is missing",
      status: 400,
    });
  }

  const user = await User.findById(id);
  if (user == null) return sendError(res, "Incorrect user id");

  const match = await bcrypt.compare(oldPassword, user.password);
  if (!match) return sendError(res, "Incorrect user or password");

  const salt = await bcrypt.genSalt(10);
  const encryptedPwd = await bcrypt.hash(newPassword, salt);

  user.set({
    password: encryptedPwd,
  });

  await user.save();

  res.status(200).send({
    email: user.email,
    _id: user._id,
  });
}

async function generateTokens(userId: string) {
  const accessToken = jwt.sign(
    { id: userId },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.JWT_TOKEN_EXPIRATION }
  );
  const refreshToken = jwt.sign(
    { id: userId },
    process.env.REFRESH_TOKEN_SECRET
  );

  return { accessToken: accessToken, refreshToken: refreshToken };
}

const login = async (req: Request, res: Response) => {
  const email = req.body.email;
  const password = req.body.password;

  if (email == null || password == null) {
    return sendError(res, "please provide valid email and password");
  }

  try {
    const user = await User.findOne({ email: email });
    if (user == null) return sendError(res, "Incorrect user or password");

    const match = await bcrypt.compare(password, user.password);
    if (!match) return sendError(res, "Incorrect user or password");

    const tokens = await generateTokens(user._id.toString());

    if (user.refresh_tokens == null)
      user.refresh_tokens = [tokens.refreshToken];
    else user.refresh_tokens.push(tokens.refreshToken);

    await user.save();
    console.log("{ ...tokens, id: user._id }: ", { ...tokens, id: user._id });
    return res.status(200).send({ ...tokens, id: user._id });
  } catch (err) {
    console.log("error: " + err);
    return sendError(res, "fail checking user");
  }
};

function getTokenFromRequest(req: Request): string {
  const authHeader = req.headers["authorization"];
  if (authHeader == null) return null;
  return authHeader.split(" ")[1];
}

type TokenInfo = {
  id: string;
};

const refresh = async (req: Request, res: Response) => {
  const refreshToken = getTokenFromRequest(req);
  if (refreshToken == null) return sendError(res, "authentication missing");

  try {
    const user: TokenInfo = <TokenInfo>(
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    );
    const userObj = await User.findById(user.id);
    if (userObj == null) return sendError(res, "fail validating token");

    if (!userObj.refresh_tokens.includes(refreshToken)) {
      userObj.refresh_tokens = [];
      await userObj.save();
      return sendError(res, "fail validating token");
    }

    const tokens = await generateTokens(userObj._id.toString());

    userObj.refresh_tokens[userObj.refresh_tokens.indexOf(refreshToken)] =
      tokens.refreshToken;

    await userObj.save();

    return res.status(200).send({ ...tokens, id: userObj._id });
  } catch (err) {
    return sendError(res, "fail validating token");
  }
};

const logout = async (req: Request, res: Response) => {
  const refreshToken = getTokenFromRequest(req);
  if (refreshToken == null) return sendError(res, "authentication missing");

  try {
    const user = <TokenInfo>(
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET)
    );
    const userObj = await User.findById(user.id);
    if (userObj == null) return sendError(res, "fail validating token");

    if (!userObj.refresh_tokens.includes(refreshToken)) {
      userObj.refresh_tokens = [];
      await userObj.save();
      return sendError(res, "fail validating token");
    }

    userObj.refresh_tokens.splice(
      userObj.refresh_tokens.indexOf(refreshToken),
      1
    );
    await userObj.save();
    return res.status(200).send();
  } catch (err) {
    return sendError(res, "fail validating token");
  }
};

const googleSignUser = async (req: Request, res: Response) => {
  try {
    const { email, name, avatar } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      // create a user
      const salt = await bcrypt.genSalt(10);
      const encryptedPwd = await bcrypt.hash(defaultPass, salt);

      user = new User({
        email,
        password: encryptedPwd,
        name,
        avatarUrl: avatar,
      });
    }

    const tokens = await generateTokens(user._id.toString());

    if (user.refresh_tokens == null)
      user.refresh_tokens = [tokens.refreshToken];
    else user.refresh_tokens.push(tokens.refreshToken);

    await user.save();

    return res.status(200).send({ ...tokens, id: user._id });
  } catch (err) {
    return sendError(res, err + "Failed to authenticate google user");
  }
};

const authenticateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = getTokenFromRequest(req);
  if (token == null) return sendError(res, "authentication missing");
  try {
    const user = <TokenInfo>jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.body.userId = user.id;

    return next();
  } catch (err) {
    return sendError(res, "fail validating token");
  }
};

export = {
  changeUserPassword,
  login,
  refresh,
  register,
  logout,
  googleSignUser,
  authenticateMiddleware,
};
