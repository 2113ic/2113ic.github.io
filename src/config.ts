import { defineConfig } from '@util/config'
import { camelCase } from '@util/common'

function getIcons() {
  const icons: Record<string, string> = {}
  const svgs = import.meta.glob('@asset/svgs/*.svg', 
    { query: '?raw', eager: true, import: 'default' }
  )

  for (const svg in svgs) {
    const name = svg.match(/svgs\/(.+?)\.svg$/)![1]
    // icons[camelCase(name)] = svgs[svg] as string
    icons[name] = svgs[svg] as string
  }

  return icons
}

const links = {
  github: 'https://github.com/2113ic',
  twitter: 'https://twitter.com/icxiaoyanz',
  figma: 'https://www.figma.com/@2113ic',
  dot: 'https://github.com/2113ic/dot',
  blog: 'https://github.com/2113ic/2113ic.github.io',
  gitNote: 'https://github.com/2113ic/Git-learn-note',
  vocabulary: 'https://github.com/2113ic/Mini_myVocabulary',
}

const icons = getIcons()

export default defineConfig({
  title: '默小言的空间',
  name: '2113ic',
  info: '前端开发者 / 业余设计师 / 学生',
  findme: [
    {
      url: links.github,
      icon: icons.github,
      label: 'Github',
    },
    {
      url: links.twitter,
      icon: icons.twitter,
      background: '#00acee',
    },
    {
      url: links.figma,
      icon: icons.figma,
      background: '#f7c104',
    },
  ],
  projects: [
    {
      url: links.dot,
      icon: icons.dot,
      title: '我的兴趣作品',
      summary: 'my personal hobby projects',
    },
    {
      url: links.blog,
      icon: icons.blog,
      title: '默小言的空间',
      summary: '简陋的个人博客',
    },
    {
      url: links.gitNote,
      icon: icons.git,
      title: 'Git Learn Note',
      summary: '我的Git学习笔记',
    },
    {
      url: links.vocabulary,
      icon: icons.noteBook,
      title: 'My Vocabulary',
      summary: '我的词汇量小程序（辅助记单词的小工具',
    },
  ],
})
