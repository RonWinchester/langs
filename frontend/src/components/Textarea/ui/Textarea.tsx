import { FormikProps } from "formik";

import { classNames } from "../../../lib/classNames/classNames";

import style from "./Textarea.module.scss";

interface TextareaProps<T>
    extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    $name: keyof T;
    label: string;
    formik: FormikProps<T>;
}

const Textarea = <T,>({ $name, label, formik, ...props }: TextareaProps<T>) => {
    const value = formik.values[$name] as string;
    const error = formik.errors[$name] as string;
    const touched = formik.touched[$name] as boolean;

    return (
        <div className={classNames(style.contaniner)}>
            <label htmlFor={$name as string}>{label}</label>
            <textarea
                onChange={(e) =>
                    formik.setFieldValue($name as string, e.target.value)
                }
                onBlur={() => formik.setFieldTouched($name as string, true)}
                value={value}
                name={$name as string}
                id={$name as string}
                {...props}
            />
            {touched && error && <div className={style.error}>{error}</div>}
        </div>
    );
};

export default Textarea;
