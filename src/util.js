const GetProvider = async () => {
    const provider = await detectEthereumProvider();
    return provider;
}

const getWeb3 = async () => {
    let xdc3 = new Web3(await GetProvider());
    return xdc3;
}



const GetChainId = async () => {
    let xdc3 = new Web3(await GetProvider());
    console.log("tetjsothaosdg", xdc3.eth.net.getId())
    const val = await xdc3.eth.net.getId();
    return val;
}

const GetCurrentProvider = async () => {
    // if (window.web3.currentProvider.isMetaMask) {
        const chainId = await GetChainId();
        console.log("testing heres", chainId)

        if ([50, 51].includes(chainId)) {
            console.log("testing this")
            return "xinpay";
        }
        console.log("testing that")

        return "metamask";
    // }
}
