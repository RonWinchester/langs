import { z } from "zod";

import { createCardInput } from "../createCard/input";
import { createWordsInput } from "../createWords/input";

const updateWordsInput = createWordsInput.extend({
    id: z.number().optional(),
    deleted: z.boolean().optional(),
}).omit({ cardId: true });

export const updateCardInput = createCardInput.extend({
    id: z.number(),
    words: z.array(updateWordsInput).optional(),
});
