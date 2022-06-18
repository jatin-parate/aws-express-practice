import { Router } from 'express';
// @ts-ignore
import CognitoExpress from 'cognito-express';
import { Unauthorized } from 'http-errors';
import Todo from './todos.model';

const cognitoExpress = new CognitoExpress({
  region: process.env.AWS_REGION!,
  cognitoUserPoolId: process.env.AWS_COGNITO_POOL_ID!,
  tokenUse: 'access',
  // tokenExpiration: 3600000,
});

const todosRouter = Router();

todosRouter.use(async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new Unauthorized();
  }

  await new Promise<void>((resolve, reject) => {
    cognitoExpress.validate(authorization, (err: Error, result: never) => {
      if (err) {
        return reject(new Unauthorized());
      }

      // @ts-ignore
      req.user = result;
      return resolve();
    });
  });
  next();
});

todosRouter.get('/', async (req, res) => {
  res.json(
    await Todo.find({
      username: (req as any).user.username,
    }).exec(),
  );
});

todosRouter.post('/', async (req, res) => {
  res.status(201).json(
    await Todo.create({
      ...req.body,
      username: (req as any).user.username,
    }),
  );
});

todosRouter.delete('/:id', async (req, res) => {
  await Todo.deleteOne({ _id: req.params.id });
  res.status(200).json({});
});

export default todosRouter;
