import { createCardInput } from "@langs/backend/src/router/createCard/input";
import { useState } from "react";

import { Alert } from "../../../components/Alert";
import Input from "../../../components/Input";
import Textarea from "../../../components/Textarea";
import { classNames } from "../../../lib/classNames/classNames";
import { useForm } from "../../../lib/hooks/useForm";
import { trpc } from "../../../lib/trpc";

import style from "./AddCard.module.scss";
import { WordInputForm } from "./AddWordForm/WordInputForm";

const AddCard = () => {
    const createWords = trpc.createWord.useMutation();
    const createCard = trpc.createCard.useMutation();

    const [cardId, setCardId] = useState<number | null>(null);
    const [words, setWords] = useState<
        { original: string; translation: string }[]
    >([]);


    const {formik, buttonProps, alertProps} = useForm({
        initialValues: {
            theme: "",
            description: "",
        },
        validationSchema: createCardInput,
        onSubmit: async (values) => {
            const newCard = await createCard.mutateAsync(values);
            setCardId(newCard.id);
        },
    });

    const handleAddWord = async (word: {
        original: string;
        translation: string;
    }) => {
        if (!cardId) return;
        try {
            await createWords.mutateAsync({ ...word, cardId });
            setWords([...words, word]);
        } catch (err) {
            console.error("Ошибка при добавлении слова", err);
        }
    };
    return (
        <div>
            <h1>AddCard</h1>
            <form
                className={classNames(style.form)}
                onSubmit={(e) => {
                    e.preventDefault();
                    formik.handleSubmit();
                }}
            >
                <Input<typeof formik.initialValues>
                    label="Theme"
                    $name="theme"
                    formik={formik}
                    disabled={formik.isSubmitting}
                />
                <Textarea<typeof formik.initialValues>
                    label="Description"
                    $name="description"
                    formik={formik}
                    disabled={formik.isSubmitting}
                />
                <Alert {...alertProps} />
                <button type="submit" disabled={buttonProps.loading || buttonProps.disabled}>
                    Submit
                </button>
            </form>

            {cardId && (
                <div>
                    <h2>Добавить слова</h2>
                    <WordInputForm onAddWord={handleAddWord} />
                    <ul>
                        {words.map((word, index) => (
                            <li key={index}>
                                {word.original} - {word.translation}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default AddCard;
