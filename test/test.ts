import { expect } from "chai";
import { ethers } from "hardhat";
import { Signer } from "ethers";

describe("MiPrimerContrato", function () {
  let contrato: any;
  let owner: Signer;
  let addr1: Signer;
  let addr2: Signer;

  beforeEach(async function () {
    // Obtener signers
    [owner, addr1, addr2] = await ethers.getSigners();

    // Desplegar contrato
    const MiPrimerContrato = await ethers.getContractFactory("MiPrimerContrato");
    contrato = await MiPrimerContrato.deploy("¡Hola Mundo!");
    await contrato.deployed();
  });

  it("Debería desplegarse correctamente", async function () {
    expect(contrato.address).to.not.equal(0);
  });

  it("Debería tener el saludo inicial correcto", async function () {
    expect(await contrato.obtenerSaludo()).to.equal("¡Hola Mundo!");
  });

  it("Solo el owner debería poder cambiar el saludo", async function () {
    // Owner puede cambiar el saludo
    await contrato.cambiarSaludo("Nuevo saludo");
    expect(await contrato.obtenerSaludo()).to.equal("Nuevo saludo");

    // Otro usuario no puede cambiar el saludo
    await expect(
      contrato.connect(addr1).cambiarSaludo("Saludo no autorizado")
    ).to.be.revertedWith("Solo el owner puede ejecutar esta funcion");
  });

  it("Debería incrementar el contador correctamente", async function () {
    expect(await contrato.contador()).to.equal(0);
    
    await contrato.incrementarContador();
    expect(await contrato.contador()).to.equal(1);
    
    await contrato.connect(addr1).incrementarContador();
    expect(await contrato.contador()).to.equal(2);
  });

  it("Debería manejar correctamente los fondos", async function () {
    // Enviar ETH al contrato
    const cantidad = ethers.utils.parseEther("1.0");
    await owner.sendTransaction({
      to: contrato.address,
      value: cantidad
    });
    
    expect(await contrato.obtenerBalance()).to.equal(cantidad);
    
    // Solo owner puede retirar
    const balanceInicial = await ethers.provider.getBalance(await owner.getAddress());
    await contrato.retirarFondos();
    const balanceFinal = await ethers.provider.getBalance(await owner.getAddress());
    
    expect(balanceFinal).to.be.gt(balanceInicial);
  });
});