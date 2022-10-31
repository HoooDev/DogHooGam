import Web3 from "web3";
import axios from "axios";
import { NFTContract, TOKENContract } from "./SmartContract";

const web3 = new Web3();
web3.setProvider(
  new Web3.providers.HttpProvider(process.env.NEXT_PUBLIC_GETH_NODE)
);

export const getAdminAdress = async () => {
  const res = await web3.eth.getCoinbase();
  return res;
};

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
  await TOKENContract.methods.approve(coinBase, 10).send({ from: coinBase });
  // 허용 한 후 ERC-20 토큰 전송 ( 로그인 시 10 잉크 (10잉크 -> 1피드) )
  await TOKENContract.methods
    .transferFrom(coinBase, wallet.address, 10)
    .send({ from: coinBase });
  return [wallet.address, wallet.privateKey];
};

const sendFileToIPFS = async (e, file, text) => {
  e.preventDefault(process.env.NEXT_PUBLIC_GETH_NODE);

  console.log(file);
  let ImgHash;
  let getImg;
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
      await web3.eth.personal
        .unlockAccount(
          process.env.NEXT_PUBLIC_COINBASE,
          process.env.NEXT_PUBLIC_COINBASE_PASSWORD,
          15000
        )
        .then(console.log("계정해제"));
      // Take a look at your Pinata Pinned section, you will see a new file added to you list.
    } catch (error) {
      console.log("Error sending File to IPFS: ");
      console.log(error);
    }

    const data = JSON.stringify({
      description: text, // NFT 설명
      imageHash: ImgHash, // IPFS에 올린 이미지 주소
      name: `(유저이름)의 강아지 - ${text.dogName} `, //
      imageUrl: `https://gateway.pinata.cloud/ipfs/${getImg}`
    });
    console.log(data);
    const config = {
      method: "post",
      url: "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      headers: {
        "Content-Type": "application/json",
        pinata_api_key: `${process.env.NEXT_PUBLIC_PINATA_API_KEY}`,
        pinata_secret_api_key: `${process.env.NEXT_PUBLIC_PINATA_API_SECRET}`
      },
      data
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
        "0x56b3de125f0885052181a83e9e6aa4a78f5215ab",
        `ipfs://${res.data.IpfsHash}`
      )
      .send({ from: process.env.NEXT_PUBLIC_COINBASE })
      .then((response) => console.log(response));

    const tx = {
      from: process.env.NEXT_PUBLIC_COINBASE, // 보내는 주소
      to: "0x56b3de125f0885052181a83e9e6aa4a78f5215ab", // 받는 주소
      value: 1e18 // 1코인 송금
    };
    // eslint-disable-next-line no-shadow
    await web3.eth.sendTransaction(tx).then((res) => console.log(res));
  }
  return `https://gateway.pinata.cloud/ipfs/${getImg}`;
};

export default sendFileToIPFS;
