import { defineConfig } from '@/utils/config'

import githubIcon from '@/assets/svgs/github.svg?raw'
import twitterIcon from '@/assets/svgs/twitter.svg?raw'
import figmaIcon from '@/assets/svgs/figma.svg?raw'
import gitIcon from '@/assets/svgs/git.svg?raw'
import dotIcon from '@/assets/svgs/dot.svg?raw'
import blogIcon from '@/assets/svgs/blog.svg?raw'
import noteBookIcon from '@/assets/svgs/note-book.svg?raw'

const links = {
  github: 'https://github.com/2113ic',
  twitter: 'https://twitter.com/icxiaoyanz',
  figma: 'https://www.figma.com/@2113ic',
  dot: 'https://github.com/2113ic/dot',
  blog: 'https://github.com/2113ic/2113ic.github.io',
  gitNote: 'https://github.com/2113ic/Git-learn-note',
  vocabulary: 'https://github.com/2113ic/Mini_myVocabulary',
}

export default defineConfig({
  title: '默小言的空间',
  name: '2113ic',
  info: '前端开发者 / 业余设计师 / 学生',
  findme: [
    {
      url: links.github,
      icon: githubIcon,
      label: 'Github',
    },
    {
      url: links.twitter,
      icon: twitterIcon,
      background: '#00acee',
    },
    {
      url: links.figma,
      icon: figmaIcon,
      background: '#f7c104',
    },
  ],
  projects: [
    {
      url: links.dot,
      icon: dotIcon,
      title: '我的兴趣作品',
      summary: 'my personal hobby projects',
    },
    {
      url: links.blog,
      icon: blogIcon,
      title: '默小言的空间',
      summary: '简陋的个人博客',
    },
    {
      url: links.gitNote,
      icon: gitIcon,
      title: 'Git Learn Note',
      summary: '我的Git学习笔记',
    },
    {
      url: links.vocabulary,
      icon: noteBookIcon,
      title: 'My Vocabulary',
      summary: '我的词汇量小程序（辅助记单词的小工具',
    },
  ],
})
