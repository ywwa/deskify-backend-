import prisma from "../prisma";

export default async function dbMembersGet(groupId: number) {
  const groupMembers = await prisma.member.findMany({
    where: { groupId: groupId },
    include: {
      user: {
        include: {
          groups: true,
          memberOf: true,
          logs: true,
        },
      },
      group: {
        include: {
          owner: {
            include: {
              groups: true,
              memberOf: true,
              logs: true,
            },
          },
          members: true,
          userLogs: true,
        },
      },
    },
  });

  return groupMembers;
}
