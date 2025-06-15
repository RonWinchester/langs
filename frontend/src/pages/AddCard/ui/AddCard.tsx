import { createCardInput } from "@langs/backend/src/router/createCard/input";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Alert } from "../../../components/Alert";
import Input from "../../../components/Input";
import Textarea from "../../../components/Textarea";
import { WordPairFormElemen } from "../../../components/WordPairFormElemen";
import { useForm } from "../../../lib/hooks/useForm";
import { getCardRoute } from "../../../lib/router/routes";
import { trpc } from "../../../lib/trpc";

const AddCard = () => {
    const createWords = trpc.createWord.useMutation();
    const createCard = trpc.createCard.useMutation();
    const navigate = useNavigate();
    const [words, setWords] = useState<
        { original: string; translation: string }[]
    >([]);

    const { formik, buttonProps, alertProps } = useForm({
        initialValues: {
            title: "",
            theme: "",
            description: "",
        },
        validationSchema: createCardInput,
        onSubmit: async (values) => {
            const newCard = await createCard.mutateAsync(values);
            await createWords.mutateAsync({ cardId: newCard.id, words });
            navigate(getCardRoute(newCard.id));
        },
    });

    const handleAddWordPair = () => {
        setWords([...words, { original: "", translation: "" }]);
    };

    return (
        <form
            className="fade-in"
            onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit();
            }}
        >
            <h2 className="text-xl font-semibold mb-6">
                Добавить новый набор слов
            </h2>
            <Alert {...alertProps} />

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

            <h3 className="text-lg font-medium mb-3">Пары слов</h3>
            <div className="bg-white rounded-xl shadow-sm overflow-hidden mb-6">
                <div className="p-4">
                    {words.map((pair, index) => (
                        <WordPairFormElemen
                            key={index}
                            index={index}
                            pair={pair}
                            words={words}
                            setWords={setWords}
                        />
                    ))}

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

            <div className="flex space-x-4">
                <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                >
                    Отмена
                </button>
                <button
                    type="submit"
                    className={
                        "flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors" +
                        " " +
                        (buttonProps.disabled ||
                        buttonProps.loading ||
                        words.length < 2
                            ? "opacity-50 cursor-not-allowed"
                            : "")
                    }
                    disabled={buttonProps.disabled}
                >
                    {buttonProps.loading ? "Сохранение..." : "Сохранить набор"}
                </button>
            </div>
        </form>
    );
};

export default AddCard;
