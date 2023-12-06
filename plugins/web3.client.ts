import { ethers } from "ethers";

export default defineNuxtPlugin(() => {
    return {
        provide: {
            client: window.ethereum,
            ethers: window.ethereum
                ? new ethers.BrowserProvider(window.ethereum)
                : null,
        },
    };
});
