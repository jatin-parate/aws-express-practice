import type { RequestHandler } from 'express';
import { NotFound } from 'http-errors';

export const notFoundHandler: RequestHandler = (req, res, next) => {
  next(new NotFound('Page not found!'));
};
