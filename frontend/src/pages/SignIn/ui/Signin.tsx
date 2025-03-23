import { signInInput } from "@langs/backend/src/router/signIn/validation";
import { useFormik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { memo, useState } from "react";

import Input from "../../../components/Input";
import { classNames } from "../../../lib/classNames/classNames";
import { trpc } from "../../../lib/trpc";

import style from "./Signup.module.scss";

interface SigninProps {
    className?: string;
}

const Signin = memo(({ className, ...otherProps }: SigninProps) => {
    const login = trpc.signIn.useMutation();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: "",
            password: "",
        },
        validate: withZodSchema(signInInput),
        onSubmit: async (values) => {
            try {
                setError(false);
                await login.mutateAsync(values);
                formik.resetForm();
                setSuccess(true);
                setTimeout(() => setSuccess(false), 2000);
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
                {success && <div className={style.success}>Success</div>}
                {error && <div className={style.error}>Error</div>}
                <button type="submit" disabled={formik.isSubmitting}>
                    Signin
                </button>
            </form>
        </div>
    );
});

export default Signin;
