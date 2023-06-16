import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { excavatorValidationSchema } from 'validationSchema/excavators';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getExcavators();
    case 'POST':
      return createExcavator();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getExcavators() {
    const data = await prisma.excavator
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'excavator'));
    return res.status(200).json(data);
  }

  async function createExcavator() {
    await excavatorValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.invitation?.length > 0) {
      const create_invitation = body.invitation;
      body.invitation = {
        create: create_invitation,
      };
    } else {
      delete body.invitation;
    }
    if (body?.project?.length > 0) {
      const create_project = body.project;
      body.project = {
        create: create_project,
      };
    } else {
      delete body.project;
    }
    const data = await prisma.excavator.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
