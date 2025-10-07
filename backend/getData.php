<?php

// Cargar el autoload de Composer
require __DIR__ . '/../vendor/autoload.php';

// Cargar las variables de entorno desde el archivo .env
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../../usuario', 'credenciales.env');
$dotenv->load();

// Activar el reporte de errores para depuración
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Obtener las variables del archivo .env
$servername = $_ENV['DB_HOST'];
$username = $_ENV['DB_USER'];
$password = $_ENV['DB_PASS'];
$dbname = $_ENV['DB_NAME'];
$port = $_ENV['DB_PORT'];

// Puerto por defecto de MySQL es 3306



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

// Función para obtener la imagen de un producto específico por ID
function getImageProductById($conn, $id_producto) {
    $sql = "SELECT IMAGE FROM CATALOGO WHERE ID_PRODUCTO = ?";
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
function getProductByFamilia($conn, $id_familia) {
    $sql = "SELECT ID_PRODUCTO, NOMBRE, DESCRIPCION, MARCA, IMAGE FROM CATALOGO WHERE ID_FAMILIA = ? LIMIT 20";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id_familia);  // "i" significa un parámetro entero
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
    $sql = "SELECT ID_PRODUCTO, NOMBRE, DESCRIPCION, MARCA, IMAGE FROM CATALOGO WHERE ID_CATEGORIA = ? LIMIT 20";
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
    $sql = "SELECT ID_PRODUCTO, NOMBRE, DESCRIPCION, MARCA, IMAGE FROM CATALOGO WHERE NOMBRE LIKE ? LIMIT 100";
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
    }elseif ($action == 'getImageProductById' && isset($_GET['id_producto'])) {
        $id_producto = mysqli_real_escape_string($conn, $_GET['id_producto']);
        $data = getImageProductById($conn, $id_producto);
    }elseif ($action == 'getProductByFamilia' && isset($_GET['id_familia'])) {
        $id_familia = mysqli_real_escape_string($conn, $_GET['id_familia']);
        $data = getProductByFamilia($conn, $id_familia);
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
