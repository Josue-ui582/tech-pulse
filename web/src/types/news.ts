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