
import { prisma } from "../../app/shared/prisma"; 
import { ApiError } from "../../utils/ApiError";
import httpStatus from 'http-status';
import bcrypt from 'bcrypt';
import { jwtHelper } from "../../app/helper/jwtHelper";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import config from "../../config";
import { UserStatus } from "@prisma/client";
import ms from "ms";



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

export const AuthService = {
 registerUser,
  loginUser,
  refreshToken,
  changePassword
};