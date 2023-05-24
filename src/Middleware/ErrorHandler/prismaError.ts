import { NextFunction, Request, Response } from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import logger from "../../Utils/logger";

/**
 * Middleware for handling errors generated by prisma ORM.
 *
 * @param err Error
 * @param _req Request
 * @param res Response
 * @param next NextFunction
 */
export default async function prismaErrorHandler(
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!(err instanceof PrismaClientKnownRequestError)) return next(err);

  logger.debug(
    `Treating PrismaClientKnownRequestError with code ${err.code}`,
  );

  switch (err.code) {
    case "P2002":
      return res
        .status(422)
        .json({
          errors: [`The field ${err.meta?.target} is not unique`],
        });

    case "P2025":
      return res
        .status(422)
        .json({
          errors: [`${err.meta?.cause}`],
        });

    default:
      logger.debug(
        `Unhandled error with code ${err.code} in prismaErrorHandler`,
      );
      return res.sendStatus(500);
  }
}
