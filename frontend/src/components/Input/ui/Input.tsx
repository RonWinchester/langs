import { FormikProps } from "formik";

import { classNames } from "../../../lib/classNames/classNames";

import style from "./Input.module.scss";

interface InputProps<T> extends React.InputHTMLAttributes<HTMLInputElement> {
    type?: string;
    $name: keyof T;
    label: string;
    formik: FormikProps<T>;
}

const Input = <T,>({ type = "text", $name, label, formik, ...props }: InputProps<T>) => {
    const value = formik.values[$name] as string;
    const error = formik.errors[$name] as string;
    const touched = formik.touched[$name] as boolean;

    return (
        <div className={classNames(style.contaniner)}>
            <label htmlFor={$name as string}>{label}</label>
            <input
                type={type}
                onChange={(e) =>
                    formik.setFieldValue($name as string, e.target.value)
                }
                value={value}
                onBlur={() => formik.setFieldTouched($name as string, true)}
                name={$name as string}
                id={$name as string}
                {...props}
            />
            {touched && error && <div className={style.error}>{error}</div>}
        </div>
    );
};

export default Input;
