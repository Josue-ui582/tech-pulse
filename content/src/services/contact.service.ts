import { prisma } from "../lib/pisma.js"


export const contactService = (name: string, email: string, subject: string, message: string) => {
  return prisma.contactMessage.create({
    data: {
      name,
      email,
      subject,
      message,
    },
  });
}