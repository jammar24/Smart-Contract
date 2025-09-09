import { ethers } from "hardhat";

async function main() {
  console.log("🚀 Desplegando MiPrimerContrato...");
  
  // Obtener el factory del contrato
  const MiPrimerContrato = await ethers.getContractFactory("MiPrimerContrato");
  
  // Desplegar el contrato con el saludo inicial
  const contrato = await MiPrimerContrato.deploy("¡Hola Mundo desde mi primer smart contract!");
  
  // Esperar a que se mine
  await contrato.deployed();
  
  console.log("✅ Contrato desplegado en:", contrato.address);
  console.log("📝 Transaction hash:", contrato.deployTransaction.hash);

  // Obtener el saludo inicial
  const saludo = await contrato.obtenerSaludo();
  console.log("👋 Saludo inicial:", saludo);
  
  return contrato.address;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
  });