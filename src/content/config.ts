import { z, defineCollection } from "astro:content"
import { formatDate } from "@/utils"
import config from "@/config"

const posts = defineCollection({
  // prettier-ignore
  schema: z.object({
    title       : z.string(),
    cover       : z.string().optional(),
    isDraft     : z.boolean().default(false),
    author      : z.string().default(config.name),
    date        : z.string().transform(str => formatDate(str)),
    tags        : z.array(z.string()),
    publish     : z.string(),
    description : z.string(),
  })
})

export const collections = { posts }
