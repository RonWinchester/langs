import { FormikProps } from "formik";

import { classNames } from "../../../lib/classNames/classNames";

import style from "./Input.module.scss";

interface InputProps<T> extends React.InputHTMLAttributes<HTMLInputElement> {
    type?: string;
    $name: keyof T | string;
    label: string;
    formik: FormikProps<T>;
}

const Input = <T,>({
    type = "text",
    $name,
    label,
    formik,
    ...props
}: InputProps<T>) => {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const getNestedValue = (obj: any, path: string) => {
        return path.split(".").reduce((acc, part) => {
            if (acc && part.includes("[")) {
                const [key, index] = part.split("[");
                const idx = parseInt(index.replace("]", ""), 10);
                return acc[key] ? acc[key][idx] : undefined;
            }
            return acc ? acc[part] : undefined;
        }, obj);
    };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const value = formik.values[$name] ??
        (getNestedValue(formik.values, $name as string) as string);
    const error = getNestedValue(formik.errors, $name as string) as
        | string
        | undefined;
    const touched = getNestedValue(formik.touched, $name as string) as
        | boolean
        | undefined;


    return (
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor={$name as string}>{label}</label>
            <input
                type={type}
                onChange={(e) =>
                    formik.setFieldValue($name as string, e.target.value)
                }
                value={value || ""}
                onBlur={() => formik.setFieldTouched($name as string, true)}
                name={$name as string}
                id={$name as string}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...props}
            />
            {touched && error && <div className={style.error}>{error}</div>}
        </div>
    );
};

export default Input;
