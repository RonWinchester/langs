import { createUserInput } from "@langs/backend/src/router/createUser/validation";
import Cookies from "js-cookie";
import { BookOpen } from "lucide-react";
import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import { Alert } from "../../../components/Alert";
import Input from "../../../components/Input";
import { useForm } from "../../../lib/hooks/useForm";
import { trpc } from "../../../lib/trpc";


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
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-top p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-3">
                        <div className="bg-blue-600 text-white p-3 rounded-full">
                            <BookOpen size={32} />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Регистрация
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Создайте аккаунт, чтобы начать изучение английского
                    </p>
                </div>
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <form onSubmit={formik.handleSubmit} className="p-6">
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
                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                            disabled={
                                buttonProps.loading || buttonProps.disabled
                            }
                        >
                            Зарегистрироваться
                        </button>
                    </form>
                </div>

                <div className="text-center mt-6">
                    <p className="text-gray-600">
                        Уже есть аккаунт?{" "}
                        <Link
                            to="/login"
                            className="text-blue-600 font-medium hover:underline"
                        >
                            Войти
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
});

export default Signup;
