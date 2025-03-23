import { createUserInput } from "@langs/backend/src/router/createUser/validation";
import { useFormik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import Cookies from "js-cookie";
import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import Input from "../../../components/Input";
import { classNames } from "../../../lib/classNames/classNames";
import { trpc } from "../../../lib/trpc";

import style from "./Signup.module.scss";

interface SignupProps {
    className?: string;
}

const Signup = memo(({ className, ...otherProps }: SignupProps) => {
    const navigate = useNavigate();
    const createUser = trpc.createUser.useMutation();
    const [error, setError] = useState(false);
    const trpcUtils = trpc.useUtils();
    const formik = useFormik({
        initialValues: {
            name: "",
            password: "",
            passwordRepeat: "",
        },
        validate: withZodSchema(
            createUserInput
                .extend({
                    passwordRepeat: z.string().min(1),
                })
                .superRefine(({ password, passwordRepeat }, ctx) => {
                    if (password !== passwordRepeat) {
                        ctx.addIssue({
                            code: z.ZodIssueCode.custom,
                            message: "Пароли не совпадают",
                            path: ["passwordRepeat"],
                        });
                    }
                }),
        ),
        onSubmit: async (values) => {
            try {
                setError(false);
                const { token } = await createUser.mutateAsync(values);
                Cookies.set("token", token, { expires: 30 });
                await trpcUtils.invalidate();
                navigate("/");
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                setError(error.message);
                setTimeout(() => {
                    setError(false);
                }, 2000);
            }
        },
    });
    return (
        <div
            className={classNames(style.Signup, {}, [className])}
            {...otherProps}
        >
            <h1>Signup</h1>
            <form onSubmit={formik.handleSubmit}>
                <Input $name={"name"} label="Name" formik={formik} />
                <Input
                    $name={"password"}
                    label="Password"
                    type="password"
                    formik={formik}
                />
                <Input
                    $name={"passwordRepeat"}
                    label="Repeat password"
                    type="password"
                    formik={formik}
                />
                {error && <div className={style.error}>Error</div>}
                <button type="submit" disabled={formik.isSubmitting}>
                    Signup
                </button>
            </form>
        </div>
    );
});

export default Signup;
