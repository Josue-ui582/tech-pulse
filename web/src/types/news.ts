export type Category = "Tech"| "IA" | "Dev";

export interface News {
    id: string,
    title: string,
    description: string,
    imageUrl: string,
    category: string,
    viewsCount: number,
    publishedAt: Date
}

export interface UpdateNewsData {
  title?: string;
  description?: string;
  category?: string;
  image?: File;
}

export type AuthForm = {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
};