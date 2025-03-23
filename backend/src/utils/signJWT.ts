import jwt from "jsonwebtoken";

export const signJWT = (id: string | number) => {
    return jwt.sign({ id }, process.env.JWT_SECRET as string, {
        expiresIn: "30d",
    });
};