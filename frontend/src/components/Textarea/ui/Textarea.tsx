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
        <div className="mb-4">
            <label htmlFor={$name as string} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
            <textarea
                onChange={(e) =>
                    formik.setFieldValue($name as string, e.target.value)
                }
                onBlur={() => formik.setFieldTouched($name as string, true)}
                value={value}
                name={$name as string}
                id={$name as string}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...props}
            />
            {touched && error && <div className={style.error}>{error}</div>}
        </div>
    );
};

export default Textarea;
