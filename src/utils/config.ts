import type { ConfigOption, ResultOption } from '@type/config'

export function defineConfig(option: ConfigOption): ResultOption {
  return {
    ...option,
    blogs: {
      showNum: 5,
      pageSize: 7,
      pagerCount: 7,
      dateDelimiter: '-',
    },
  }
}
