import prisma from "../prisma";

export default async function userCreate(
  username  : string,
  email     : string,
  firstName : string,
  lastName  : string,
  password  : string
) {
  const user = prisma.user.create({
    data: {
      username,
      email,
      firstName,
      lastName,
      password
    }
  });

  return user;
};
