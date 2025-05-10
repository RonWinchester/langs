import { createUserInput } from "@langs/backend/src/router/createUser/validation";
import { Button, PasswordInput, TextInput } from "@mantine/core";
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
            <h1>Зарегистрироваться</h1>
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
                <PasswordInput
                    onChange={(e) =>
                        formik.setFieldValue("passwordRepeat", e.target.value)
                    }
                    value={formik.values["passwordRepeat"] as string}
                    onBlur={() =>
                        formik.setFieldTouched("passwordRepeat", true)
                    }
                    name={"passwordRepeat"}
                    id={"passwordRepeat"}
                    label="Repeat password"
                    placeholder="Repeat password"
                />
                <Button
                    type="submit"
                    loading={buttonProps.loading}
                    disabled={buttonProps.disabled}
                    fullWidth
                >
                    Зарегистрироваться
                </Button>
                <Alert {...alertProps} />
            </form>
        </div>
    );
});

export default Signup;
