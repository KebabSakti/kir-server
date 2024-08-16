import { Response } from "express";

export class Unauthorized extends Error {
  message: string;

  constructor(message: string = "Kredensial tidak valid") {
    super();
    this.message = message;
  }
}

export class BadRequest extends Error {
  message: string;

  constructor(message: string = "Parameter yang diberikan tidak sesuai") {
    super();
    this.message = message;
  }
}

export class NotFound extends Error {
  message: string;

  constructor(message: string = "Resource tidak ditemukan") {
    super();
    this.message = message;
  }
}

export class InternalFailure extends Error {
  message: string;

  constructor(
    message: string = "Terjadi kesalahan internal, harap coba beberapa saat lagi"
  ) {
    super();
    this.message = message;
  }
}

export function Failure(error: Error, res: Response): void {
  console.log(error);

  let code = 500;

  if (error instanceof Unauthorized) {
    code = 401;
  }

  if (error instanceof NotFound) {
    code = 400;
  }

  if (error instanceof BadRequest) {
    code = 404;
  }

  res.status(code).json(error.message);
}
