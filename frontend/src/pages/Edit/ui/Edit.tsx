import { TrpcRouterOutput } from "@langs/backend/src/router";
import { updateCardInput } from "@langs/backend/src/router/updateCard/validate";
import { useFormik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Input from "../../../components/Input";
import Textarea from "../../../components/Textarea";
import { getCardRoute } from "../../../lib/router/routes";
import { trpc } from "../../../lib/trpc";

import styles from "./Edit.module.scss";

interface EditPageProps {
    card: NonNullable<TrpcRouterOutput["getCard"]>;
}

const EditPageComponent = ({ card }: EditPageProps) => {
    const navigate = useNavigate();
    const [submittingError, setSubmittingError] = useState<boolean>(false);
    const updateCard = trpc.updateCard.useMutation();
    const formik = useFormik({
        initialValues: {
            theme: card.theme,
            description: card.description,
            words: card.pairs,
        },
        validate: withZodSchema(updateCardInput.omit({ id: true })),
        onSubmit: async (values) => {
            try {
                setSubmittingError(false);
                await updateCard.mutateAsync({
                    ...values,
                    id: card.id,
                });
                navigate(getCardRoute(card.id));
            } catch (error: unknown) {
                setSubmittingError(true);
            }
        },
    });
    console.log(card);
    return (
        <div className={styles.edit}>
            <h1>{card.theme}</h1>
            <form onSubmit={formik.handleSubmit}>
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
                <div>
                    <h2>Words</h2>
                    <div className={styles.words_container}>
                        {card.pairs.map((pair, index) => (
                            <div key={pair.id} className={styles.pairs}>
                                <div>
                                    <Input<typeof formik.initialValues>
                                        label="Original"
                                        $name={`words[${index}].original`}
                                        formik={formik}
                                        disabled={formik.isSubmitting}
                                    />
                                </div>
                                <div>
                                    <Input<typeof formik.initialValues>
                                        label="Translation"
                                        $name={`words[${index}].translation`}
                                        formik={formik}
                                        disabled={formik.isSubmitting}
                                    />
                                </div>
                                <button
                                    // onClick={() => {
                                    //     const newWords =
                                    //         formik.values.words.filter(
                                    //             (word) => word.id !== pair.id,
                                    //         );
                                    //     formik.setFieldValue("words", newWords);
                                    // }}
                                    type="button"
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <button type="submit" disabled={formik.isSubmitting}>
                    Submit
                </button>
                {submittingError && <div>Something went wrong</div>}
            </form>
        </div>
    );
};

const Edit = () => {
    const { id } = useParams();

    const card = trpc.getCard.useQuery({
        id: Number(id),
    });

    const user = trpc.getUser.useQuery();

    if (card.isLoading || user.isLoading) {
        return <div>Loading</div>;
    }

    if (card.isError || user.isError) {
        return <div>Error</div>;
    }

    if (!card.data) {
        return <div>Card Not found</div>;
    }

    if (!user.data) {
        return <div>Only auth user</div>;
    }

    if (user.data.user?.id !== card.data.author.id) {
        return <div>Only author can edit</div>;
    }

    return <EditPageComponent card={card.data} />;
};

export default Edit;
