import fs from "fs/promises";
import path from "path";

const FILE_PATH = path.join(process.cwd(), "data.json");

export const writeData = async (data: any[]) => {
    await fs.writeFile(FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
};