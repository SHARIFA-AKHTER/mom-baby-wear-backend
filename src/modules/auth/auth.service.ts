
import { prisma } from "../../app/shared/prisma"; 
import { ApiError } from "../../utils/ApiError";
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import { jwtHelper } from "../../app/helper/jwtHelper";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import config from "../../config";
import { UserStatus } from "@prisma/client";
import ms from "ms";

import { hashPassword } from "../../utils/hashPassword";
import { OAuth2Client } from 'google-auth-library';


const registerUser = async ({ name, email, password }: { name: string; email: string; password: string }) => {
  
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw new Error("Email already used");

  const hashed = await bcrypt.hash(password, Number(config.bcrypt_salt_round));

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      needPasswordChange: false,
    },
  });

  const secret: Secret = config.jwt.secret as string;

  const signOptions: SignOptions = {
    expiresIn: ms(config.jwt.expires_in),
  };

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    secret,
    signOptions
  );

  return { user, token };
};


const loginUser = async (payload: { email: string; password: string }) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { email: payload.email },
  });

  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    user.password
  );

  if (!isCorrectPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Password is incorrect!");
  }

  const accessToken = jwtHelper.generateToken(
    { id: user.id, email: user.email, role: user.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in
  );

  const refreshToken = jwtHelper.generateToken(
    { email: user.email, role: user.role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: user.needPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;

  try {
    decodedData = jwtHelper.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized user!");
  }

  const userData = await prisma.user.findUniqueOrThrow({
    where: { 
      email: decodedData.email,
      status: UserStatus.ACTIVE 
    },
  });

  const newAccessToken = jwtHelper.generateToken(
    { email: userData.email, role: userData.role },
    config.jwt.secret as Secret,
    config.jwt.expires_in
  );

  return {
    accessToken: newAccessToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

const changePassword = async (user: any, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );

  if (!isCorrectPassword) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Old password incorrect!");
  }

  const hashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_round)
  );

  await prisma.user.update({
    where: { email: userData.email },
    data: {
      password: hashedPassword,
      needPasswordChange: false,
    },
  });

  return { message: "Password changed successfully!" };
};

const getMe = async (accessToken: string) => {
  if (!accessToken) throw new Error("Access token missing");

  const decodedData: any = jwtHelper.verifyToken(
    accessToken,
    config.jwt.secret as Secret
  );

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData.email,
      status: UserStatus.ACTIVE,
    },
  });

const { id, email, role, needPasswordChange, status, name, profileImage } = userData;

  return { id, email, role, needPasswordChange, status,name, profileImage };
};


const client = new OAuth2Client(config.google.client_id);
interface GooglePayload {
  idToken: string;
}

const authWithGoogle = async (payload: GooglePayload) => {
  const { idToken } = payload;

  if (!idToken) {
    throw new Error("Google idToken required!");
  }

  // ✅ Verify token with Google
  const ticket = await client.verifyIdToken({
    idToken,
    audience: config.google.client_id,
  });

  const googleUser = ticket.getPayload();

  if (!googleUser?.email) {
    throw new Error("Google authentication failed!");
  }

  const { email, name, picture } = googleUser;

  // ✅ Check user exists
  let user = await prisma.user.findUnique({
    where: { email },
  });

  // ✅ Create user if not exists
  if (!user) {
    user = await prisma.user.create({
      data: {
        email,
        name: name || "Google User",
        password: await hashPassword("google-auth"),
        profileImage: picture,
        role: "CUSTOMER",
        needPasswordChange: false,
      },
    });
  }

  // ✅ Generate JWT (MATCHES your middleware)
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    config.jwt.secret,
    { expiresIn: "7d" }
  );

  return {
    success: true,
    message: "Google login successful",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};


export const AuthService = {
 registerUser,
  loginUser,
  refreshToken,
  changePassword,
  getMe,
  authWithGoogle
};