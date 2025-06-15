import { ArrowLeft } from "lucide-react";
import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

import { Alert } from "../../../components/Alert";
import Input from "../../../components/Input";
import { useAuth } from "../../../lib/context/AppContext";
import { useForm } from "../../../lib/hooks/useForm";
import { trpc } from "../../../lib/trpc";

const Profile = memo(() => {
    const navigate = useNavigate();
    const updateUser = trpc.updateUser.useMutation();
    const { user } = useAuth();
    const trpcUtils = trpc.useUtils();

    const { formik, buttonProps, alertProps } = useForm({
        initialValues: {
            name: user?.name || "",
            currentPassword: "",
            newPassword: "",
        },
        validationSchema: z.object({
            name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
            currentPassword: z.string().optional(),
            newPassword: z.string().optional(),
        }).superRefine((data, ctx) => {
            // Если указан текущий пароль, то новый пароль обязателен
            if (data.currentPassword && !data.newPassword) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "При указании текущего пароля необходимо указать новый пароль",
                    path: ["newPassword"],
                });
            }

            // Если указан текущий пароль, он должен быть не менее 5 символов
            if (data.currentPassword && data.currentPassword.length < 5) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Пароль должен содержать минимум 5 символов",
                    path: ["currentPassword"],
                });
            }

            // Если указан новый пароль, он должен быть не менее 5 символов
            if (data.newPassword && data.newPassword.length < 5) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Пароль должен содержать минимум 5 символов",
                    path: ["newPassword"],
                });
            }
        }),
        onSubmit: async (values) => {
            const dataToSubmit = {
                name: values.name,
                ...(values.currentPassword && {
                    currentPassword: values.currentPassword,
                }),
                ...(values.newPassword && { newPassword: values.newPassword }),
            };

            await updateUser.mutateAsync(dataToSubmit);
            await trpcUtils.getUser.invalidate();
            navigate("/");
        },
    });

    if (!user) {
        return (
            <div className="text-center py-10">
                <p className="text-gray-600">Вы не авторизованы</p>
                <Link
                    to="/signin"
                    className="mt-4 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors"
                >
                    Войти
                </Link>
            </div>
        );
    }

    return (
        <div className="fade-in">
            <div className="flex items-center mb-6">
                <button
                    onClick={() => navigate(-1)}
                    className="p-2 mr-3 rounded-full hover:bg-gray-100 transition-colors"
                >
                    <ArrowLeft size={20} />
                </button>
                <h2 className="text-xl font-semibold">
                    Редактирование профиля
                </h2>
            </div>

            <form onSubmit={formik.handleSubmit}>
                <Alert {...alertProps} />
                <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                    <div className="p-4">
                        <Input<typeof formik.initialValues>
                            label="Имя пользователя"
                            $name="name"
                            formik={formik}
                            disabled={formik.isSubmitting}
                        />
                        <Input<typeof formik.initialValues>
                            label="Текущий пароль"
                            $name="currentPassword"
                            type="password"
                            formik={formik}
                            disabled={formik.isSubmitting}
                        />
                        <Input<typeof formik.initialValues>
                            label="Новый пароль"
                            $name="newPassword"
                            type="password"
                            formik={formik}
                            disabled={formik.isSubmitting}
                        />
                    </div>
                </div>

                <div className="flex space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        Отмена
                    </button>
                    <button
                        type="submit"
                        className={
                            "flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors" +
                            " " +
                            (buttonProps.disabled || buttonProps.loading
                                ? "opacity-50 cursor-not-allowed"
                                : "")
                        }
                        disabled={buttonProps.disabled}
                    >
                        {buttonProps.loading ? "Сохранение..." : "Сохранить"}
                    </button>
                </div>
            </form>
        </div>
    );
});

Profile.displayName = "Profile";

export default Profile;
