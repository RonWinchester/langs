import { useFormik } from "formik";
import {withZodSchema} from "formik-validator-zod";
import {z} from "zod";

import Input from "../../../components/Input";
import Textarea from "../../../components/Textarea";
import { classNames } from "../../../lib/classNames/classNames";

import style from "./AddCard.module.scss";

const AddCard = () => {
    const formik = useFormik({
        initialValues: {
            theme: "",
            description: "",
        },
        validate: withZodSchema(z.object({
            theme: z.string().min(3),
            description: z.string().min(10),
        })),
        onSubmit: (values) => {
            console.log(values);
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
                <Input<typeof formik.initialValues> label="Theme" name="theme" formik={formik} />
                <Textarea<typeof formik.initialValues> label="Description" name="description" formik={formik} />
                <button type="submit" disabled={!formik.isValid}>
                    Submit
                </button>
            </form>
        </div>
    );
};

export default AddCard;
