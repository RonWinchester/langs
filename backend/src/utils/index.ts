import crypto from "crypto";

export const getPassword = (password: string) => {
    return crypto.createHash("sha256").update(password).digest("hex");
};
