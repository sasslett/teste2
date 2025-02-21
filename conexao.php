<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "libras_db";

// Criar conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

echo "Conectado com sucesso";

// Exemplo de consulta ao banco de dados
$sql = "SELECT id, nome, sinal FROM sinais_libras";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Exibir os sinais de Libras
    while($row = $result->fetch_assoc()) {
        echo "id: " . $row["id"]. " - Nome: " . $row["nome"]. " - Sinal: " . $row["sinal"]. "<br>";
    }
} else {
    echo "0 resultados";
}

$conn->close();
?>
