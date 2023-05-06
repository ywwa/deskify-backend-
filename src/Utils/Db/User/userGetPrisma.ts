import prisma from "../prisma";

export default async function userGetPrisma(
  username: string
) {
  if ( !username ) return null;

  const user = await prisma.user.findUnique({
    where: { username },
    include: {
      groups: true,
      member: true,
      logs  : true
    }
  });

  return user;
};
