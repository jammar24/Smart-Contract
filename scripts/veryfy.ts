import { run } from "hardhat";

async function verify(contractAddress: string, args: any[]) {
  console.log("Verificando contrato en Etherscan...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
    console.log("✅ Contrato verificado exitosamente");
  } catch (e: any) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("✅ Contrato ya verificado");
    } else {
      console.log("❌ Error en verificación:", e);
    }
  }
}

export { verify };