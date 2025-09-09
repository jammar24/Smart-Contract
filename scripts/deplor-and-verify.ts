import { ethers } from "hardhat";
import { verify } from "./verify";

async function main() {
  console.log("🚀 Desplegando MiPrimerContrato...");

  const MiPrimerContrato = await ethers.getContractFactory("MiPrimerContrato");
  const saludoInicial = "¡Hola Mundo desde mi primer smart contract!";

  const contrato = await MiPrimerContrato.deploy(saludoInicial);
  await contrato.deployed();
  
  console.log("✅ Contrato desplegado en:", contrato.address);
  console.log("📝 Transaction hash:", contrato.deployTransaction.hash);
  
  // Esperar a que se minen algunos bloques antes de verificar
  console.log("⏳ Esperando confirmaciones...");
  await contrato.deployTransaction.wait(6);
  
  // Verificar el contrato
  await verify(contrato.address, [saludoInicial]);
  
  return contrato.address;
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("❌ Error:", error);
    process.exit(1);
  });