const setFulFilment = async (web3,accounts) => {
      
        
    
    let  nodeaddress, bool, contractaddr;

    $("#bool").on("change", (e) => {
        bool = e.target.value;
    });
    $("#nodeaddress").on("change", (e) => {
        nodeaddress = e.target.value;
    });
    $("#contractaddr").on("change", (e) => {
        contractaddr = e.target.value;
    });
    $("#setFulfilment").on("click", async (e) => {
        e.preventDefault();
        const data = await $.getJSON("./abi.json");
        console.log("data",data)
        const oracleContract = new web3.eth.Contract(
            data,
            contractaddr
          );
        const nonce = await web3.eth.getTransactionCount(accounts[0]);
        console.log("nonce value is", nonce)
        const gasPrice = await web3.eth.getGasPrice();
        console.log("gasPrice value is", gasPrice)
        await oracleContract.methods
                .setFulfillmentPermission(nodeaddress, bool)
                .send({ from: accounts[0], gas: "210000" })
                .on("transactionHash", function (transactionHash) {
                    console.log("transactionhahs", transactionHash)
                    $("#result").html(`<div class="alert alert-success fade in alert-dismissible show" style="margin-top:18px;">
                      <strong>Success!</strong> <a href="https://explorer.apothem.network/tx/${transactionHash}>View Transaction</a>
                   </div>`);
                  
            })
    });
};


async function mainFunc() {
 
    const web3 = await getWeb3();
    console.log("Web3", web3);
    const accounts = await web3.eth.getAccounts();
    console.log("Web3", accounts[0]);
   
    await setFulFilment(web3, accounts);
}


mainFunc();