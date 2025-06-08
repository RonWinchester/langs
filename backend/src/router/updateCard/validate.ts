import { z } from "zod";

import { createCardInput } from "../createCard/input";

const updateWordsInput = z.object({
    id: z.number().optional(),
    deleted: z.boolean().optional(),
    original: z.string(),
    translation: z.string(),
})

export const updateCardInput = createCardInput.extend({
    id: z.number(),
    pairs: z.array(updateWordsInput).optional(),
});
