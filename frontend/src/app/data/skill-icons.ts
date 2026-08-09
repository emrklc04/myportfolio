// Standard-Logos fuer bekannte Skills (devicon-CDN), falls im Admin-Panel keine eigene iconUrl gesetzt wurde.
const DEVICON_BASE = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';

const DEFAULT_SKILL_ICONS: Record<string, string> = {
  java: `${DEVICON_BASE}/java/java-original.svg`,
  javascript: `${DEVICON_BASE}/javascript/javascript-original.svg`,
  typescript: `${DEVICON_BASE}/typescript/typescript-original.svg`,
  angular: `${DEVICON_BASE}/angularjs/angularjs-original.svg`,
  react: `${DEVICON_BASE}/react/react-original.svg`,
  'spring boot': `${DEVICON_BASE}/spring/spring-original.svg`,
  spring: `${DEVICON_BASE}/spring/spring-original.svg`,
  'node.js': `${DEVICON_BASE}/nodejs/nodejs-original.svg`,
  nodejs: `${DEVICON_BASE}/nodejs/nodejs-original.svg`,
  python: `${DEVICON_BASE}/python/python-original.svg`,
  html: `${DEVICON_BASE}/html5/html5-original.svg`,
  html5: `${DEVICON_BASE}/html5/html5-original.svg`,
  css: `${DEVICON_BASE}/css3/css3-original.svg`,
  css3: `${DEVICON_BASE}/css3/css3-original.svg`,
  git: `${DEVICON_BASE}/git/git-original.svg`,
  docker: `${DEVICON_BASE}/docker/docker-original.svg`,
  postgresql: `${DEVICON_BASE}/postgresql/postgresql-original.svg`,
  mysql: `${DEVICON_BASE}/mysql/mysql-original.svg`,
  mongodb: `${DEVICON_BASE}/mongodb/mongodb-original.svg`,
  kubernetes: `${DEVICON_BASE}/kubernetes/kubernetes-plain.svg`,
  c: `${DEVICON_BASE}/c/c-original.svg`,
  'c++': `${DEVICON_BASE}/cplusplus/cplusplus-original.svg`,
  'c#': `${DEVICON_BASE}/csharp/csharp-original.svg`,
};

const FALLBACK_ICON = `${DEVICON_BASE}/devicon/devicon-original.svg`;

export function getSkillIconUrl(name: string, iconUrl?: string | null): string {
  if (iconUrl && iconUrl.trim().length > 0) {
    return iconUrl;
  }
  return DEFAULT_SKILL_ICONS[name.trim().toLowerCase()] ?? FALLBACK_ICON;
}
