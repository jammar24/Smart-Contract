// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MiPrimerContrato {
    // Variables de estado
    string private saludo;
    address public owner;
    uint256 public contador;
    
    // Eventos
    event SaludoCambiado(string nuevoSaludo, address quienCambio);
    event ContadorIncrementado(uint256 nuevoValor, address quienIncremento);
    
    // Modificador para restringir acceso
    modifier soloOwner() {
        require(msg.sender == owner, "Solo el owner puede ejecutar esta funcion");
        _;
    }
    
    // Constructor
    constructor(string memory _saludoInicial) {
        saludo = _saludoInicial;
        owner = msg.sender;
        contador = 0;
    }
    
    // Función para obtener el saludo
    function obtenerSaludo() public view returns (string memory) {
        return saludo;
    }
    
    // Función para cambiar el saludo (solo owner)
    function cambiarSaludo(string memory _nuevoSaludo) public soloOwner {
        saludo = _nuevoSaludo;
        emit SaludoCambiado(_nuevoSaludo, msg.sender);
    }
    
    // Función para incrementar el contador
    function incrementarContador() public {
        contador += 1;
        emit ContadorIncrementado(contador, msg.sender);
    }
    
    // Función para obtener el balance del contrato
    function obtenerBalance() public view returns (uint256) {
        return address(this).balance;
    }
    
    // Función para recibir ether
    receive() external payable {}
    
    // Función para retirar fondos (solo owner)
    function retirarFondos() public soloOwner {
        payable(owner).transfer(address(this).balance);
    }
}