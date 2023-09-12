export interface ResultOption extends ConfigOption {
  blogs: defaultBlogConfig
}

export interface ConfigOption {
  title: string
  name: string
  info: string
  findme?: FindmeItem[]
  projects?: ProjectItem[]
  blogs?: BlogConfig
}

export interface FindmeItem {
  url: string
  icon: string
  label?: string
  background?: string
}

export interface ProjectItem {
  url: string
  icon: string
  title: string
  summary: string
}

export interface BlogConfig {
  showNum?: number
  pageSize?: number
  pagerCount?: number
  dateDelimiter?: string
}

export interface defaultBlogConfig {
  showNum: number
  pageSize: number
  pagerCount: number
  dateDelimiter: string
}
