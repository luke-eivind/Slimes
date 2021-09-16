pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract Slime is ERC721Enumerable, Ownable{

  using SafeMath for uint256;
  uint256 public constant slimePrice = 10000000000000000; //0.01 ETH
  uint256 public maxSlimes;
  bool public saleIsActive = false;
  string public baseURI = "";
  uint public constant maxSlimePurchase = 20;


  constructor(string memory name, string memory symbol, uint256 maxNftSupply) ERC721(name, symbol) {
      maxSlimes = maxNftSupply;
      //REVEAL_TIMESTAMP = saleStart + (86400 * 9);
  }

  function withdraw() public onlyOwner {
      uint balance = address(this).balance;
      payable(msg.sender).transfer(balance);  //need to convert msg.sender from type 'address' to type 'payable address' in solidity >0.8.0
  }


  function reserveSlimes() public onlyOwner {
      uint supply = totalSupply();
      uint i;
      for (i = 0; i < 30; i++) {
          _safeMint(msg.sender, supply + i);
      }
  }

  function setBaseURI(string memory ipfsBaseURI) public onlyOwner {
    baseURI = ipfsBaseURI;
  }

  function _baseURI() internal view override returns (string memory) {
      return baseURI;
  }

  function flipSaleState() public onlyOwner {
      saleIsActive = !saleIsActive;
  }

  function mintSlime(uint numberOfTokens) public payable {
      require(saleIsActive, "Sale must be active to mint Slime");
      require(numberOfTokens <= maxSlimePurchase, "Can only mint 20 tokens at a time");
      require(totalSupply().add(numberOfTokens) <= maxSlimes, "Purchase would exceed max supply of Slimes");
      require(slimePrice.mul(numberOfTokens) <= msg.value, "Ether value sent is not correct");

      for(uint i = 0; i < numberOfTokens; i++) {
          uint mintIndex = totalSupply();
          if (totalSupply() < maxSlimes) {
              _safeMint(msg.sender, mintIndex);
          }
      }
      /*
      // If we haven't set the starting index and this is either 1) the last saleable token or 2) the first token to be sold after
      // the end of pre-sale, set the starting index block
      if (startingIndexBlock == 0 && (totalSupply() == MAX_APES || block.timestamp >= REVEAL_TIMESTAMP)) {//?? what is startingIndexBlock used for? is this the index of the current eth block?
          startingIndexBlock = block.number;
      }
      */
  }


}
