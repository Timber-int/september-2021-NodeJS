import * as uuid from 'uuid';
import path from 'path';

class FileService {
    public async saveFile(file: any) {
        try {
            console.log(file);
            const fileName = `${uuid.v4()}.jpg`;
            const filePath = path.resolve(__dirname, '../', 'fileDirectory', fileName);
            file.mv(filePath);
            return fileName;
        } catch (e: any) {
            throw new Error(e.message);
        }
    }
}

export const fileService = new FileService();
