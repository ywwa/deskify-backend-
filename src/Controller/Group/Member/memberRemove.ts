import { NextFunction, Response } from "express";
import { Request } from "express-jwt";
import { dbUserGet } from "../../../Utils/Database/User";
import { dbGroupGet } from "../../../Utils/Database/Group";
import { dbMemberDelete, dbMemberGet } from "../../../Utils/Database/Member";
import { memberViewer } from "../../../View";

export default async function fnMemberRemove(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const username = req.auth?.user?.username;
  const groupId = parseInt(req.params.gid);
  const userId = parseInt(req.params.mid);

  try {
    const authenticatedUser = await dbUserGet(username);
    if (!authenticatedUser) {
      return res.sendStatus(403);
    }

    const requestedGroup = await dbGroupGet(groupId);
    if (!requestedGroup) {
      return res.sendStatus(404);
    }

    if (requestedGroup.ownerId !== authenticatedUser.id) {
      return res.sendStatus(403);
    }

    const deletableMember = await dbMemberGet({ groupId, userId });
    if (!deletableMember) {
      return res.sendStatus(404);
    }

    const deletedMember = await dbMemberDelete(deletableMember.id);
    const deletedMemberView = memberViewer(deletedMember);

    return res.status(201).json({ member: deletedMemberView });
  } catch (error) {
    return next(error);
  }
}
