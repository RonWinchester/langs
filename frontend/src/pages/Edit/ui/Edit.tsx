import { TrpcRouterOutput } from "@langs/backend/src/router";
import { updateCardInput } from "@langs/backend/src/router/updateCard/validate";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Alert } from "../../../components/Alert";
import Input from "../../../components/Input";
import Textarea from "../../../components/Textarea";
import { WordPairFormElemen } from "../../../components/WordPairFormElemen";
import { useAuth } from "../../../lib/context/AppContext";
import { useForm } from "../../../lib/hooks/useForm";
import { getCardRoute } from "../../../lib/router/routes";
import { trpc } from "../../../lib/trpc";

import styles from "./Edit.module.scss";

interface EditPageProps {
    card: NonNullable<TrpcRouterOutput["getCard"]>;
}

const EditPageComponent = ({ card }: EditPageProps) => {
    const navigate = useNavigate();
    const [words, setWords] = useState<
        {
            original: string;
            translation: string;
            deleted?: boolean;
            id?: number;
        }[]
    >(
        card.pairs.map(({ id, original, translation }) => ({
            original,
            translation,
            id,
            deleted: false,
        })),
    );
    const updateCard = trpc.updateCard.useMutation();

    const { formik, buttonProps, alertProps } = useForm({
        initialValues: {
            title: card.title,
            theme: card.theme,
            description: card.description,
            pairs: words,
        },
        validationSchema: updateCardInput.omit({ id: true }),
        onSubmit: async (values) => {
            await updateCard.mutateAsync({
                ...values,
                pairs: [...words],
                id: card.id,
            });
            navigate(getCardRoute(card.id));
        },
    });

    const handleAddWordPair = () => {
        setWords([...words, { original: "", translation: "", deleted: false }]);
    };

    return (
        <div className={styles.edit}>
            <h2 className="text-xl font-semibold mb-6">{card.title}</h2>
            <Alert {...alertProps} />
            <form onSubmit={formik.handleSubmit}>
                <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                    <div className="p-4">
                        <Input<typeof formik.initialValues>
                            label="Название"
                            $name="title"
                            formik={formik}
                            disabled={formik.isSubmitting}
                            placeholder="Например: Цвета"
                        />
                        <Input<typeof formik.initialValues>
                            label="Тема"
                            $name="theme"
                            formik={formik}
                            disabled={formik.isSubmitting}
                            placeholder="Например: Начальный уровень"
                        />
                        <Textarea<typeof formik.initialValues>
                            label="Описание"
                            $name="description"
                            formik={formik}
                            disabled={formik.isSubmitting}
                            placeholder="Кратко опишите набор слов"
                        />
                    </div>
                </div>
                <div>
                    <h3 className="text-lg font-medium mb-3">Пары слов</h3>
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                        <div className="p-4">
                            {words.map((pair, index) => {
                                if (pair.deleted) return null;
                                return (
                                    <WordPairFormElemen
                                        key={index}
                                        index={index}
                                        pair={pair}
                                        words={words}
                                        setWords={setWords}
                                        handleDelete
                                    />
                                );
                            })}

                            <button
                                type="button"
                                onClick={handleAddWordPair}
                                className="flex items-center justify-center w-full py-2 mt-2 text-blue-600 border border-dashed border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
                            >
                                <Plus size={20} className="mr-1" />
                                <span>Добавить пару слов</span>
                            </button>
                        </div>
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
                        {buttonProps.loading
                            ? "Сохранение..."
                            : "Редактировать"}
                    </button>
                </div>
            </form>
        </div>
    );
};

const Edit = () => {
    const { id } = useParams();

    const card = trpc.getCard.useQuery({
        id: Number(id),
    });

    const { user } = useAuth();

    if (card.isLoading) {
        return <div>Loading</div>;
    }

    if (card.isError) {
        return <div>Error</div>;
    }

    if (!card.data) {
        return <div>Card Not found</div>;
    }

    if (!user) {
        return <div>Only auth user</div>;
    }

    if (user?.id !== card.data.author.id) {
        return <div>Only author can edit</div>;
    }

    return <EditPageComponent card={card.data} />;
};

export default Edit;
