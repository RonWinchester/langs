import { createCardInput } from "@langs/backend/src/router/createCard/input";
import { useFormik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { useState } from "react";

import Input from "../../../components/Input";
import Textarea from "../../../components/Textarea";
import { classNames } from "../../../lib/classNames/classNames";
import { trpc } from "../../../lib/trpc";

import style from "./AddCard.module.scss";

const AddCard = () => {
    const createCard = trpc.createCard.useMutation();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const formik = useFormik({
        initialValues: {
            theme: "",
            description: "",
        },
        validate: withZodSchema(createCardInput),
        onSubmit: async (values) => {
            try {
                await createCard.mutateAsync(values);
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                }, 2000);
            } catch (error) {
                setError(true);
                setTimeout(() => {
                    setError(false);
                }, 2000);
            }
        },
    });
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
                {success && <div className={style.success}>Success</div>}
                {error && <div className={style.error}>Error</div>}
                <button type="submit" disabled={formik.isSubmitting}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddCard;
