import { Group, User } from "@prisma/client";

type UserWithGroups = User & { groups: Group[] };

export default function profileViewer(
  user        : UserWithGroups,
  showGroups ?: Boolean
) {
  var groups;
  if ( !showGroups ) {
    groups = user
      ? Boolean(
        user.groups.find(
          (obj) => obj.ownerId == user.id
        )
      )
      : false;
  } else {
    groups = user.groups;
  }

  const profileView = {
    username      : user.username,
    email         : user.email,
    firstName     : user.firstName,
    lastName      : user.lastName,
    image         : user.image,
    groups        : groups
  };

  return profileView;
} 