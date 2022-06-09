import type { ErrorRequestHandler } from 'express';
import { HttpError, InternalServerError } from 'http-errors';
import { BadRequestWithValidationErrors } from '../errors/BadRequestWithValidationErrors';

export const errorHandlerMiddleware: ErrorRequestHandler = (
  err: Error | HttpError | BadRequestWithValidationErrors,
  _req,
  res,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next,
) => {
  let error: HttpError;
  if (!(err instanceof HttpError)) {
    error = new InternalServerError();
  } else {
    error = err;
  }

  res.status(error.statusCode);

  if (error instanceof BadRequestWithValidationErrors) {
    res.json({ error: error.validationErrors });
  } else {
    res.json({ error: [{ message: error.message }] });
  }
};
