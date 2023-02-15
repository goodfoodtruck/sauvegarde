import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { ConnectionRefusedError, ForeignKeyConstraintError, ValidationError } from "sequelize"

export const errorHandler = (e: unknown) => {
    let error = {status: 500, message: ""};
    if (e instanceof ValidationError) {
        error = {
            status: 400,
            message: "Invalid body request"
        }
    } else if (e instanceof ConnectionRefusedError) {
        error = {
            status: 500,
            message: "Error connecting to database"
        }
    } else if (e instanceof ForeignKeyConstraintError) {
        error = {
            status: 422,
            message: "User does not exist"
        }
    } else if (e instanceof TokenExpiredError) {
        error = {
            status: 401,
            message: e.message
        }
    } else if (e instanceof JsonWebTokenError) {
        error = {
            status: 400,
            message: e.message
        }
    }
    console.error(error.message, e);
    return error;
}