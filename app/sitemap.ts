import type { MetadataRoute } from 'next';

import { Category } from '@/types/category';
import { Post } from '@/types/post';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://locahost:3000';
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://locahost:8080';

async function fetchPosts() {
  try {
    const res = await fetch(`${API_URL}/api/posts`);
    if (!res.ok) throw new Error('Failed to fetch posts');
    const { data } = await res.json();
    return data.posts || [];
  } catch (error) {
    console.error('Error fetching posts for sitemap:', error);
    return [];
  }
}

async function fetchCategories() {
  try {
    const res = await fetch(`${API_URL}/api/categories`);
    if (!res.ok) throw new Error('Failed to fetch categories');
    const { data } = await res.json();
    return data.categories || [];
  } catch (error) {
    console.error('Error fetching categories for sitemap:', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, categories] = await Promise.all([fetchPosts(), fetchCategories()]);

  const postUrls = posts.map((post: Post) => ({
    url: `${BASE_URL}/post/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.createdAt),
  }));

  const categoryUrls = categories.map((category: Category) => ({
    url: `${BASE_URL}/category/${category.slug}`,
    lastModified: new Date(),
  }));

  // Extract unique tags from posts
  const tagSet = new Set<string>();
  posts.forEach((post: Post) => {
    post.tags?.forEach((tag: string) => tagSet.add(tag));
  });
  const tagUrls = Array.from(tagSet).map((tag) => ({
    url: `${BASE_URL}/tag/${encodeURIComponent(tag)}`,
    lastModified: new Date(),
  }));

  return [
    { url: `${BASE_URL}/`, lastModified: new Date() },
    { url: `${BASE_URL}/login`, lastModified: new Date() },
    { url: `${BASE_URL}/register`, lastModified: new Date() },
    ...categoryUrls,
    ...postUrls,
    ...tagUrls,
  ];
}