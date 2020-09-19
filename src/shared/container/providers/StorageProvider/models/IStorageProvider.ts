export default interface ISotageProvider {
    saveFile(file: string): Promise<string>;
    deleteFile(file: string): Promise<void>;
}
