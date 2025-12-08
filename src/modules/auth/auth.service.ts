
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { prisma } from '../../app/shared/prisma';
import config from '../../config';


export const registerUser = async ({ name, email, password }: any) => {
const existing = await prisma.user.findUnique({ where: { email } });
if (existing) throw new Error('Email already used');
const hashed = await bcrypt.hash(password, 10);
const user = await prisma.user.create({ data: { name, email, password: hashed } });
const token = jwt.sign({ id: user.id }, config.jwt_secret, { expiresIn: '7d' });
return { user, token };
};


export const loginUser = async ({ email, password }: any) => {
const user = await prisma.user.findUnique({ where: { email } });
if (!user) throw new Error('Invalid credentials');
const match = await bcrypt.compare(password, user.password);
if (!match) throw new Error('Invalid credentials');
const token = jwt.sign({ id: user.id }, config.jwt_secret, { expiresIn: '7d' });
return { user, token };
};