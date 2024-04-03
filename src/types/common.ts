export interface BlogProps {
  slug: string
  data: {
    title: string
    description: string
    date: string
    tags: string[]
    cover: string
  }
}
