"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalFailure = exports.NotFound = exports.BadRequest = exports.Unauthorized = void 0;
exports.Failure = Failure;
class Unauthorized extends Error {
    message;
    constructor(message = "Kredensial tidak valid") {
        super();
        this.message = message;
    }
}
exports.Unauthorized = Unauthorized;
class BadRequest extends Error {
    message;
    constructor(message = "Parameter yang diberikan tidak sesuai") {
        super();
        this.message = message;
    }
}
exports.BadRequest = BadRequest;
class NotFound extends Error {
    message;
    constructor(message = "Resource tidak ditemukan") {
        super();
        this.message = message;
    }
}
exports.NotFound = NotFound;
class InternalFailure extends Error {
    message;
    constructor(message = "Terjadi kesalahan internal, harap coba beberapa saat lagi") {
        super();
        this.message = message;
    }
}
exports.InternalFailure = InternalFailure;
function Failure(error, res) {
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
    res
        .status(code)
        .json(code != 500 ? error.message : "Terjadi kesalahan internal");
}
