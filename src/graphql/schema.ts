import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { buildSchema } from 'graphql';

const prisma = new PrismaClient();

export const schema = buildSchema(`
  type Admin {
    id: ID!
    username: String!
  }

  type FoodTruckPermit {
    id: Int
    location_id: Int
    applicant: String
    facility_type: String
    location_desc: String
    address: String
    permit: String
    status: String
    food_items: String
    latitude: Float
    longitude: Float
    schedule_url: String
    approved_date: String
    expiration_date: String
    neighborhood: String
    zip_code: Int
    createdAt: String
    updatedAt: String
  }

  type Query {
    getAllPermits: [FoodTruckPermit]
    getPermitStatus(id: Int!): FoodTruckPermit
  }

  type Mutation {
    updateApplicationStatus(id: Int!, status: String!): FoodTruckPermit
    loginAdmin(username: String!, password: String!): String
    createAdmin(username: String!, password: String!): Admin
  }


`);

export const root = {
  getAllPermits: async () => {
    return await prisma.foodTruckPermit.findMany();
  },
  getPermitStatus: async ({ id }) => {
    return await prisma.foodTruckPermit.findUnique({
      where: { id },
    });
  },
  getAdmin: async ({ id }) => {
    return await prisma.admin.findUnique({
      where: { id },
    });
  },
  createAdmin: async ({ username, password }) => {
    const passwordHash = await bcrypt.hash(password, 10);
    return await prisma.admin.create({
      data: {
        username,
        passwordHash,
      },
    });
  },
  loginAdmin: async ({ username, password }) => {
    const admin = await prisma.admin.findUnique({
      where: { username },
    });
    if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) {
      throw new Error('Invalid credentials');
    }
    return jwt.sign({ adminId: admin.id }, 'your_secret_key', {
      expiresIn: '1h',
    });
  },
  updateApplicationStatus: async ({ id, status }) => {
    return await prisma.foodTruckPermit.update({
      where: { id },
      data: { status },
    });
  },
};
