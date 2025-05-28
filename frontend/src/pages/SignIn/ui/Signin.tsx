import { signInInput } from "@langs/backend/src/router/signIn/validation";
import Cookies from "js-cookie";
import { BookOpen } from "lucide-react";
import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Alert } from "../../../components/Alert";
import Input from "../../../components/Input";
import { useForm } from "../../../lib/hooks/useForm";
import { SIGNUP } from "../../../lib/router/routes";
import { trpc } from "../../../lib/trpc";

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
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-top p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-3">
                        <div className="bg-blue-600 text-white p-3 rounded-full">
                            <BookOpen size={32} />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Вход в приложение
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Войдите, чтобы продолжить изучение английского
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

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                            disabled={buttonProps.disabled}
                        >
                            {buttonProps.loading ? "Вход..." : "Войти"}
                        </button>
                        <Alert {...alertProps} />
                    </form>
                </div>

                <div className="text-center mt-6">
                    <p className="text-gray-600">
                        Нет аккаунта?{" "}
                        <Link
                            to={SIGNUP}
                            className="text-blue-600 font-medium hover:underline"
                        >
                            Зарегистрироваться
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
});

export default Signin;
