export type Category = "Tech"| "IA" | "Dev";

export interface News {
    id: string,
    title: string,
    description: string,
    imageUrl: string,
    viewsCount: number,
    publishedAt: Date
}