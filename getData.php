<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

$servername = "";
$username ="";
$password =""
$dbname = "";
$port =3306;
// Crear la conexión
$conn = new mysqli($servername, $username, $password, $dbname, $port);
// Establecer la codificación de caracteres de la conexión a UTF-8
$conn->set_charset("utf8mb4");

// Comprobar si hubo un error de conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

// Función para obtener todas las Familias
function getAllFamilias($conn) {
    $sql = "SELECT * FROM FAMILIAS";
    $result = $conn->query($sql);

    if (!$result) {
        error_log('Error en la consulta SQL: ' . $conn->error);
        die('Ocurrió un error, por favor inténtelo más tarde.');
    }

    $data = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }

    return $data;
}

// Función para obtener todas las Categorías
function getAllCategorias($conn) {
    $sql = "SELECT * FROM CATEGORIAS";
    $result = $conn->query($sql);

    if (!$result) {
        error_log('Error en la consulta SQL: ' . $conn->error);
        die('Ocurrió un error, por favor inténtelo más tarde.');
    }

    $data = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }

    return $data;
}

// Función para obtener todos los Productos
function getAllProductos($conn) {
    $sql = "SELECT * FROM CATALOGO";
    $result = $conn->query($sql);

    if (!$result) {
        error_log('Error en la consulta SQL: ' . $conn->error);
        die('Ocurrió un error, por favor inténtelo más tarde.');
    }

    $data = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }

    return $data;
}

// Función para obtener un producto específico por ID
function getProductById($conn, $id_producto) {
    $sql = "SELECT * FROM CATALOGO WHERE ID_PRODUCTO = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id_producto);  // "i" significa un parámetro entero
    $stmt->execute();
    $result = $stmt->get_result();
    
    $data = array();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }
    
    return $data;
}

// Función para obtener productos por su categoria
function getProductByCategoria($conn, $id_categoria) {
    $sql = "SELECT ID_PRODUCTO, NOMBRE, DESCRIPCION, MARCA FROM CATALOGO WHERE ID_CATEGORIA = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id_categoria);  // "i" significa un parámetro entero
    $stmt->execute();
    $result = $stmt->get_result();
    
    $data = array();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }
    
    return $data;
}

// Función para obtener productos con búsqueda aproximada
function searchProductos($conn, $search_term) {
    $sql = "SELECT ID_PRODUCTO, NOMBRE, DESCRIPCION, MARCA FROM CATALOGO WHERE NOMBRE LIKE ?";
    $stmt = $conn->prepare($sql);
    $search_term = "%" . $search_term . "%";  // Se utiliza el % para hacer una búsqueda con LIKE
    $stmt->bind_param("s", $search_term);  // "s" significa un parámetro de tipo string
    $stmt->execute();
    $result = $stmt->get_result();
    
    $data = array();
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }
    
    return $data;
}

// Verificar qué función ejecutar en base a un parámetro
if (isset($_GET['action'])) {
    $action = $_GET['action'];
    
    if ($action == 'getAllFamilias') {
        $data = getAllFamilias($conn);
    } elseif ($action == 'getAllCategorias') {
        $data = getAllCategorias($conn);
    } elseif ($action == 'getAllProductos') {
        $data = getAllProductos($conn);
    } elseif ($action == 'getProductById' && isset($_GET['id_producto'])) {
        $id_producto = mysqli_real_escape_string($conn, $_GET['id_producto']);
        $data = getProductById($conn, $id_producto);
    }elseif ($action == 'getProductByCategoria' && isset($_GET['id_categoria'])) {
        $id_categoria = mysqli_real_escape_string($conn, $_GET['id_categoria']);
        $data = getProductByCategoria($conn, $id_categoria);
    } elseif ($action == 'searchProductos' && isset($_GET['search_term'])) {
        $search_term = mysqli_real_escape_string($conn, $_GET['search_term']);
        $data = searchProductos($conn, $search_term);
    } else {
        $data = ["error" => "Acción no válida"];
    }

    // Agregar encabezado de tipo de contenido para JSON
    header('Content-Type: application/json');

    // Comprobar si los datos están vacíos
    if (empty($data)) {
        // Si no hay datos, devolver un mensaje adecuado
        echo json_encode(["error" => "No hay datos disponibles."]);
    } else {
        // Devolver los datos en formato JSON
        echo json_encode($data);
    }
}

$conn->close();
?>
