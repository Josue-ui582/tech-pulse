import multer from "multer";
import path from "node:path";

const MIME_TYPES: Record<string, string> = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpeg',
  'image/png': 'png',
  'image/avif': 'avif',
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "uploads");
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_').split('.')[0];
        const extension = path.extname(file.originalname);
        
        callback(null, `${Date.now()}_${name}${extension}`);
    }
});

export const upload = multer({ 
    storage,
    fileFilter: (req, file, callback) => {
        if (MIME_TYPES[file.mimetype]) {
            callback(null, true);
        } else {
            callback(new Error("Format de fichier non supporté"));
        }
    }
});
