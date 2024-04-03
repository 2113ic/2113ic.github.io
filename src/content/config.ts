import { z, defineCollection } from "astro:content"
import { formatDate } from '@util/common'
import config from "@config"

const Posts = defineCollection({
  type: 'content',
  schema: z.object({
    title : z.string(),
    cover : z.string().optional(),
    draft : z.boolean().default(false),
    author: z.string().default(config.name),
    date  : z.string().transform(str => formatDate(str)),
    tags  : z.array(z.string()).default([]),
    desc  : z.string(),
  })
})

export const collections = { Posts }
