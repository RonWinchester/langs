import { signInInput } from "@langs/backend/src/router/signIn/validation";
import Cookies from "js-cookie";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

import { Alert } from "../../../components/Alert";
import Input from "../../../components/Input";
import { classNames } from "../../../lib/classNames/classNames";
import { useForm } from "../../../lib/hooks/useForm";
import { trpc } from "../../../lib/trpc";

import style from "./Signup.module.scss";

interface SigninProps {
    className?: string;
}

const Signin = memo(({ className, ...otherProps }: SigninProps) => {
    const navigate = useNavigate();
    const login = trpc.signIn.useMutation();
    const trpcUtils = trpc.useUtils();

    const {formik, buttonProps, alertProps} = useForm({
        initialValues: {
            name: "",
            password: "",
        },
        validationSchema: signInInput,
        onSubmit: async (values) => {
            const { token } = await login.mutateAsync(values);
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
            <h1>Signin</h1>
            <form onSubmit={formik.handleSubmit}>
                <Input $name={"name"} label="Name" formik={formik} />
                <Input
                    $name={"password"}
                    label="Password"
                    type="password"
                    formik={formik}
                />
                <button type="submit" disabled={buttonProps.loading || buttonProps.disabled}>
                    Signin
                </button>
                <Alert {...alertProps} />
            </form>
        </div>
    );
});

export default Signin;
