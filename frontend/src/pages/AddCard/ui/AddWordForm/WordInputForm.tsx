import { createWordsInput } from "@langs/backend/src/router/createWords/input";
import { useFormik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { useState } from "react";

import Input from "../../../../components/Input";

export const WordInputForm = ({
    onAddWord,
}: {
    onAddWord: (word: { original: string; translation: string }) => void;
}) => {
    const [word, setWord] = useState("");
    const [translation, setTranslation] = useState("");

    const formik = useFormik({
        initialValues: {
            original: "",
            translation: "",
            cardId: 0,
        },
        validate: withZodSchema(createWordsInput),
        onSubmit: async () => {
            try {
                if (word && translation) {
                    onAddWord({ original: word, translation });
                    setWord("");
                    setTranslation("");
                }
            } catch (error) {
                console.log(error);
            }
        },
    });

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                formik.handleSubmit();
            }}
        >
            <Input
                label="Слово"
                value={word}
                $name={"original"}
                formik={formik}
                onChange={(e) => setWord(e.target.value)}
            />
            <Input
                label="Перевод"
                value={translation}
                $name={"translation"}
                formik={formik}
                onChange={(e) => setTranslation(e.target.value)}
            />
            <button type="submit">Добавить</button>
        </form>
    );
};
