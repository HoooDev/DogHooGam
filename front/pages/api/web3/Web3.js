import Web3 from "web3";
import axios from "axios";
import { NFTContract } from "./SmartContract";

const web3 = new Web3();
web3.setProvider(
  new Web3.providers.HttpProvider(process.env.NEXT_PUBLIC_GETH_NODE)
);

const sendFileToIPFS = async (e, file, text) => {
  e.preventDefault(process.env.NEXT_PUBLIC_GETH_NODE);
  console.log(process.env.NEXT_PUBLIC_GETH_NODE);
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
          "0x08fb12b11182248577539d21e11b9fcb3b87e844",
          "1234",
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
      image: ImgHash, // IPFS에 올린 이미지 주소
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
        "0x08fb12b11182248577539d21e11b9fcb3b87e844",
        "1234",
        15000
      )
      .then(console.log("계정해제"));
    await NFTContract.methods
      .mintNFT(
        "0xb3d796fe23c34133e549057eee49c25b599fd704",
        `ipfs://${res.data.IpfsHash}`
      )
      .send({ from: "0x08fb12b11182248577539d21e11b9fcb3b87e844" })
      .then((response) => console.log(response));

    const tx = {
      from: "0x08fb12b11182248577539d21e11b9fcb3b87e844", // 보내는 주소
      to: "0xb3d796fe23c34133e549057eee49c25b599fd704", // 받는 주소
      value: 1e18 // 1코인 송금
    };
    // eslint-disable-next-line no-shadow
    await web3.eth.sendTransaction(tx).then((res) => console.log(res));
  }
  return `https://gateway.pinata.cloud/ipfs/${getImg}`;
};

export default sendFileToIPFS;
