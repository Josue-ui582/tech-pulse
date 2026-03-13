import fs from "fs/promises";
import path from "path";

const FILE_PATH = path.join(process.cwd(), "data.json");

export const readData = async () => {
    try {
        const content = await fs.readFile(FILE_PATH, "utf-8");
        if(!content || content.trim() === "") return [];
        return JSON.parse(content);
    } catch (error) {
        return []
    }
}