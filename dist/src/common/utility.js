"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomNumber = randomNumber;
const dayjs_1 = __importDefault(require("dayjs"));
function randomNumber() {
    // Get current timestamp in milliseconds as a seed
    const seed = (0, dayjs_1.default)().valueOf();
    // Use the seed to generate a random number
    const random = Math.floor((seed * Math.random()) % 90000000) + 10000000;
    return random;
}
