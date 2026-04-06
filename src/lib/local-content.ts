import fs from 'fs';
import path from 'path';

export interface LocalArticle {
  slug: string;
  title: string;
  date: string;
  description: string;
  category: string;
  image?: string;
  content: string;
}

/**
 * Parses simple YAML-like frontmatter from Markdown content.
 * Avoids extra dependencies for basic use cases.
 */
function parseFrontmatter(fileContents: string) {
  const match = fileContents.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const data: Record<string, string> = {};
  let content = fileContents;
  
  if (match) {
    const yaml = match[1];
    content = fileContents.replace(match[0], '').trim();
    yaml.split('\n').forEach(line => {
      const [key, ...val] = line.split(':');
      if (key && val) data[key.trim()] = val.join(':').trim();
    });
  }
  
  return { data, content };
}

export function getLocalArticles(directory: 'blog' | 'services'): LocalArticle[] {
  const contentPath = path.join(process.cwd(), 'src', 'content', directory);
  
  if (!fs.existsSync(contentPath)) {
    return [];
  }

  const files = fs.readdirSync(contentPath);
  
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const slug = file.replace('.md', '');
      const fullPath = path.join(contentPath, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = parseFrontmatter(fileContents);

      return {
        slug,
        title: data.title || slug,
        date: data.date || '',
        description: data.description || '',
        category: data.category || directory,
        image: data.image || '',
        content,
      };
    })
    .sort((a, b) => (b.date > a.date ? 1 : -1));
}

export function getLocalArticleBySlug(directory: 'blog' | 'services', slug: string): LocalArticle | null {
  const fullPath = path.join(process.cwd(), 'src', 'content', directory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = parseFrontmatter(fileContents);

  return {
    slug,
    title: data.title || slug,
    date: data.date || '',
    description: data.description || '',
    category: data.category || directory,
    image: data.image || '',
    content,
  };
}
