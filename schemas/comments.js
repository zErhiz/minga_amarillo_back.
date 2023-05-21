import joi from "joi";
 export const commentValidate= joi.object({
    comment:joi.string().required().min(4).max(30).message({
        "string.min": "the title must be at least 4 characteres",
        "string.max": "the title must not have more than 30 characters",

    })
})
