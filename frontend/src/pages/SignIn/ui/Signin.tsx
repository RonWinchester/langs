import { signInInput } from "@langs/backend/src/router/signIn/validation";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import Cookies from "js-cookie";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

import { Alert } from "../../../components/Alert";
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

    const { formik, buttonProps, alertProps } = useForm({
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
            <h1>Войти</h1>
            <form onSubmit={formik.handleSubmit} className={style.form}>
                <TextInput
                    onChange={(e) =>
                        formik.setFieldValue("name", e.target.value)
                    }
                    value={formik.values["name"] as string}
                    onBlur={() => formik.setFieldTouched("name", true)}
                    name={"name"}
                    id={"name"}
                    label="Имя"
                    placeholder="Имя"
                />
                <PasswordInput
                    onChange={(e) =>
                        formik.setFieldValue("password", e.target.value)
                    }
                    value={formik.values["password"] as string}
                    onBlur={() => formik.setFieldTouched("password", true)}
                    name={"password"}
                    id={"password"}
                    label="Пароль"
                    placeholder="Пароль"
                />
                <Button
                    type="submit"
                    loading={buttonProps.loading}
                    disabled={buttonProps.disabled}
                    fullWidth
                >
                    Signin
                </Button>
                <Alert {...alertProps} />
            </form>
        </div>
    );
});

export default Signin;
