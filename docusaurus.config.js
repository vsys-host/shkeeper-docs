import path from 'path';

// @ts-check
const { themes } = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
module.exports = {
  title: 'SHKeeper Docs',
  url: 'https://docs.shkeeper.io',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'vsys-host',
  projectName: 'shkeeper-docs',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: { defaultLocale: 'en', locales: ['en'] },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: 'docs',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/vsys-host/shkeeper-docs/edit/main/',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: false,
        theme: { customCss: require.resolve('./src/css/custom.css') },
      },
    ],
    [
      'redocusaurus',
      {
        config: path.join(__dirname, 'redocly.yaml'),
        specs: [
          {
            id: 'shkeeper',
            spec: 'static/openapi/openapi.json',
            route: '/api',
          },
        ],
        theme: { primaryColor: '#2e8555' },
      },
    ],
  ],
  plugins: [
    // 🔎 Local search- indexing only /docs, exclude /api
    [
      '@easyops-cn/docusaurus-search-local',
      {
        id: 'search',
        language: ['en'],
        hashed: true,
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
        docsRouteBasePath: ['/docs'],
        highlightSearchTermsOnTargetPage: true,
        removeDefaultStopWordFilter: false,
      },
    ],
  ],
  themeConfig: {
    navbar: {
      logo: { alt: 'SHKeeper Logo', src: 'img/shkeeper-logo.svg', href: 'https://shkeeper.io' },
      items: [
        { type: 'docSidebar', sidebarId: 'defaultSidebar', to: '/docs/intro', position: 'left', label: 'Docs' },
        { to: '/api', label: 'API', position: 'left' },
        {
          href: 'https://github.com/vsys-host/shkeeper-docs',
          label: 'GitHub',
          position: 'right',
        },
        { type: 'search', position: 'right', },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Introduction', to: '/docs/intro' },
            { label: 'Getting Started', to: '/docs/getting-started/requirements' },
            { label: 'User Guide', to: '/docs/user-guide/configuration' },
            { label: 'Developer Guide', to: '/docs/developer-guide/architecture-overview' },
            { label: 'FAQ', to: '/docs/faqs' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'X', href: 'https://x.com/shkeeper_io', },
            { label: 'Telegram', href: 'https://t.me/shkeeper_updates', },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'GitHub', href: 'https://github.com/vsys-host/shkeeper.io', },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} SHKeeper.io. Open-source under GPL-3.0`,
    },
    prism: { theme: themes.github, darkTheme: themes.dracula },
  },
};

