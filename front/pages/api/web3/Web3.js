import Web3 from "web3";
import axios from "axios";
import { NFTContract, TOKENContract, TOKEN_CA } from "./SmartContract";

const web3 = new Web3();
web3.setProvider(
  new Web3.providers.HttpProvider(process.env.NEXT_PUBLIC_GETH_NODE)
);
// 코인베이스 주소 가져오기
export const getAdminAdress = async () => {
  const res = await web3.eth.getCoinbase();
  return res;
};

// 지갑 잔액 확인
export const getBalance = async (address) => {
  const res = await TOKENContract.methods
    .balanceOf(address)
    .call()
    .then((balance) => balance);
  return res;
};

// 지갑 만들기
export const createAccount = async () => {
  const coinBase = await getAdminAdress();
  const createdObj = web3.eth.accounts.create();
  const account = web3.eth.accounts.privateKeyToAccount(createdObj.privateKey);
  const wallet = web3.eth.accounts.wallet.add(account);

  await web3.eth.personal.unlockAccount(
    coinBase,
    process.env.NEXT_PUBLIC_COINBASE_PASSWORD,
    300
  );

  const Eth = web3.utils.toWei("10", "ether");
  const tx = {
    from: coinBase,
    to: wallet.address,
    value: Eth
  };
  web3.eth.sendTransaction(tx).then((receipt) => receipt);
  // ERC-20 토큰 보내기 전 허용
  await TOKENContract.methods.approve(coinBase, 100).send({ from: coinBase });
  // 허용 한 후 ERC-20 토큰 전송 ( 로그인 시 10 잉크 (10잉크 -> 1피드) )
  await TOKENContract.methods
    .transferFrom(coinBase, wallet.address, 100)
    .send({ from: coinBase });
  return [wallet.address, wallet.privateKey];
};

// NFT 만들기
const sendFileToIPFS = async (e, file, text, value, address, userKey) => {
  e.preventDefault(process.env.NEXT_PUBLIC_GETH_NODE);

  let ImgHash;
  let getImg;
  let tranHash;
  const coinBase = await getAdminAdress();

  // ERC-20 토큰 보내기 전 허용
  if (value !== 0) {
    console.log(value);
    const data = await TOKENContract.methods
      .approve(coinBase, value)
      .encodeABI();

    console.log(data);
    const txData = {
      from: address,
      gasPrice: web3.utils.toWei("42", "gwei"),
      gas: web3.utils.toHex("320000"),
      to: TOKEN_CA,
      value: "0x",
      data
    };
    console.log(txData);

    const tx = await web3.eth.accounts
      .signTransaction(txData, userKey)
      .then((ress) => ress);
    // .catch(console.log("12"));
    console.log(tx, "txtx");

    const sendTx = await web3.eth
      .sendSignedTransaction(tx.rawTransaction)
      .then((ress) => ress);
    console.log(sendTx, "센드");

    await TOKENContract.methods
      .transferFrom(
        address,
        "0x52aEdCe8c99d769C9896A518Cb5927744F5da32b",
        value
      )
      .send({ from: coinBase })
      .then((res) => res.transactionHash);

    // const amountToBn = web3.utils.toBN(`${value}`);
    // console.log(amountToBn);
    // await TOKENContract.methods
    //   .approve(address, value)
    //   .send({ from: coinBase });

    // await TOKENContract.methods
    //   .transferFrom(
    //     address,
    //     "0x52aEdCe8c99d769C9896A518Cb5927744F5da32b",
    //     amountToBn
    //   )
    //   .send({ from: coinBase });
    // .catch((err) => console.log(err));
  }

  if (file) {
    try {
      const formData = new FormData();
      formData.append("file", file);
      console.log(`${process.env.NEXT_PUBLIC_PINATA_API_KEY}`, "api key!!!");
      const resFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formData,
        headers: {
          pinata_api_key: `${process.env.NEXT_PUBLIC_PINATA_API_KEY}`,
          pinata_secret_api_key: `${process.env.NEXT_PUBLIC_PINATA_API_SECRET}`,
          "Content-Type": "multipart/form-data"
        }
      });

      ImgHash = `ipfs://${resFile.data.IpfsHash}`;
      getImg = resFile.data.IpfsHash;
      console.log(ImgHash);
      await web3.eth.personal.unlockAccount(
        process.env.NEXT_PUBLIC_COINBASE,
        process.env.NEXT_PUBLIC_COINBASE_PASSWORD,
        15000
      );
      // Take a look at your Pinata Pinned section, you will see a new file added to you list.
    } catch (error) {
      console.log("Error sending File to IPFS: ");
      console.log(error);
    }

    const nftData = JSON.stringify({
      description: text, // NFT 설명
      imageHash: ImgHash, // IPFS에 올린 이미지 주소
      name: `(유저이름)의 강아지 - ${text.dogName} `, //
      imageUrl: `https://gateway.pinata.cloud/ipfs/${getImg}`
    });
    console.log(nftData);
    const config = {
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      headers: {
        "Content-Type": "application/json",
        pinata_api_key: `${process.env.NEXT_PUBLIC_PINATA_API_KEY}`,
        pinata_secret_api_key: `${process.env.NEXT_PUBLIC_PINATA_API_SECRET}`
      },
      nftData
    };
    const res = await axios(config);
    console.log(res.data.IpfsHash, "res데이터");
    await web3.eth.personal
      .unlockAccount(
        process.env.NEXT_PUBLIC_COINBASE,
        process.env.NEXT_PUBLIC_COINBASE_PASSWORD,
        15000
      )
      .then(console.log("계정해제"));
    await NFTContract.methods
      .mintNFT(
        address, // 받는 지갑 주소
        `ipfs://${res.data.IpfsHash}`
      )
      .send({ from: process.env.NEXT_PUBLIC_COINBASE })
      .then((response) => console.log(response, "nft 리스폰스"));
  }
  return [`https://gateway.pinata.cloud/ipfs/${getImg}`, tranHash, txHash];
};

export default sendFileToIPFS;
