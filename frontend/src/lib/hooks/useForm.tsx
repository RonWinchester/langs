import { FormikHelpers, useFormik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { useMemo, useState } from "react";
import { z } from "zod";

import { AlertProps } from "../../components/Alert";

interface Props<TZodSchema extends z.ZodTypeAny> {
    successMessage?: string | false;
    resetOnSuccess?: boolean;
    onSubmit: (
        values: z.infer<TZodSchema>,
        actions: FormikHelpers<z.infer<TZodSchema>>,
    ) => Promise<void>;
    showValidationError?: boolean;
    initialValues: z.infer<TZodSchema>;
    validationSchema?: TZodSchema;
}

export const useForm = <TZodSchema extends z.ZodTypeAny>({
    successMessage,
    resetOnSuccess,
    onSubmit,
    showValidationError = false,
    initialValues,
    validationSchema,
}: Props<TZodSchema>) => {
    const [successMessageVisible, setSuccessMessageVisible] = useState(false);
    const [submittingError, setSubmittingError] = useState<Error | null>(null);
    const formik = useFormik<z.infer<TZodSchema>>({
        initialValues: initialValues || {},
        ...(validationSchema && { validate: withZodSchema(validationSchema) }),
        onSubmit: async (values, formikHelpers) => {
            try {
                setSubmittingError(null);
                await onSubmit(values, formikHelpers);
                if (resetOnSuccess) {
                    formik.resetForm();
                }
                setSuccessMessageVisible(true);
                setTimeout(() => setSuccessMessageVisible(false), 2000);
            } catch (error) {
                setSubmittingError(error as Error);
            }
        },
    });

    const alertProps = useMemo<AlertProps>(() => {
        if (submittingError) {
            return {
                hidden: false,
                color: "red",
                children: submittingError.message,
            };
        }
        if (showValidationError && !formik.isValid && !!formik.submitCount) {
            return {
                hidden: false,
                color: "red",
                children: "Ошибка валидации",
            };
        }
        if (successMessageVisible && successMessage) {
            return {
                hidden: false,
                color: "green",
                children: successMessage,
            };
        }
        return {
            hidden: true,
            color: "red",
            children: null,
        };
    }, [
        submittingError,
        showValidationError,
        formik.isValid,
        formik.submitCount,
        successMessageVisible,
        successMessage,
    ]);

    const buttonProps = useMemo(() => {
        return {
            disabled: !formik.isValid || formik.isSubmitting,
            loading: formik.isSubmitting,
        };
    }, [formik.isSubmitting, formik.isValid]);

    return { 
        formik,
        alertProps,
        buttonProps,
    };
};
