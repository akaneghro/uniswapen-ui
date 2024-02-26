import CryptoJS from "crypto-js";

export const useCrypto = () => {
    const encrypt = (data: string, key: string) => {
        return CryptoJS.AES.encrypt(data, key).toString();
    };

    const decrypt = (data: string, key: string) => {
        const bytes = CryptoJS.AES.decrypt(data, key);
        return bytes.toString(CryptoJS.enc.Utf8);
    };

    return { encrypt, decrypt };
};
