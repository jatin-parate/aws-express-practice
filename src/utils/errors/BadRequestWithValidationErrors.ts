import { BadRequest } from 'http-errors';
import type { ValidationError, Result } from 'express-validator';

export class BadRequestWithValidationErrors extends BadRequest {
  constructor(
    private readonly validationResult: Result<ValidationError>,
    message?: string,
  ) {
    super(message);
  }

  get validationErrors(): ValidationError[] {
    return this.validationResult.array();
  }
}
