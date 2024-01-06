import { ethers } from "ethers";

export default defineNuxtPlugin(() => {
    return {
        provide: {
            client: window.ethereum,
            browserProvider: window.ethereum
                ? new ethers.BrowserProvider(window.ethereum)
                : null,
            ethers: ethers,
        },
    };
});
