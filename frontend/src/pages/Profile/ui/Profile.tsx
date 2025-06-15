import { updateUserInput } from "@langs/backend/src/router/updateUser/validation";
import { ArrowLeft } from "lucide-react";
import { memo } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Alert } from "../../../components/Alert";
import Input from "../../../components/Input";
import { useAuth } from "../../../lib/context/AppContext";
import { useForm } from "../../../lib/hooks/useForm";
import { trpc } from "../../../lib/trpc";

const Profile = memo(() => {
    const navigate = useNavigate();
    const updateUser = trpc.updateUser.useMutation();
    const { user } = useAuth();

    const { formik, buttonProps, alertProps } = useForm({
        initialValues: {
            name: user?.name || "",
            currentPassword: "",
            newPassword: "",
        },
        validationSchema: updateUserInput,
        onSubmit: async (values) => {
            await updateUser.mutateAsync(values);
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
                            label="Новый пароль (необязательно)"
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
