const Slime = artifacts.require("Slime");

module.exports = function(deployer) {
  deployer.deploy(Slime, "Slime", "SL", 10000);
};
