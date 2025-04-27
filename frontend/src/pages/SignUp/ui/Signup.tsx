import { createUserInput } from "@langs/backend/src/router/createUser/validation";
import Cookies from "js-cookie";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

import { Alert } from "../../../components/Alert";
import Input from "../../../components/Input";
import { classNames } from "../../../lib/classNames/classNames";
import { useForm } from "../../../lib/hooks/useForm";
import { trpc } from "../../../lib/trpc";

import style from "./Signup.module.scss";

interface SignupProps {
    className?: string;
}

const Signup = memo(({ className, ...otherProps }: SignupProps) => {
    const navigate = useNavigate();
    const createUser = trpc.createUser.useMutation();
    const trpcUtils = trpc.useUtils();
    const { formik, buttonProps, alertProps } = useForm({
        initialValues: {
            name: "",
            password: "",
            passwordRepeat: "",
        },
        validationSchema: createUserInput
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
        onSubmit: async (values) => {
            const { token } = await createUser.mutateAsync(values);
            Cookies.set("token", token, { expires: 30 });
            await trpcUtils.invalidate();
            navigate("/");
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
                <Alert {...alertProps} />
                <button
                    type="submit"
                    disabled={buttonProps.loading || buttonProps.disabled}
                >
                    Signup
                </button>
            </form>
        </div>
    );
});

export default Signup;
