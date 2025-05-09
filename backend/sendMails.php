<?php
// Importar las clases necesarias
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Cargar el autoload de Composer
require __DIR__ . '/../vendor/autoload.php';

// Encabezado JSON
header('Content-Type: application/json');

// Obtener datos enviados por POST desde JavaScript
$nombre = isset($_POST['nombre']) ? $_POST['nombre'] : 'Anónimo';
$correo = isset($_POST['correo']) ? $_POST['correo'] : 'correo@ejemplo.com';
$telefono = isset($_POST['telefono']) ? $_POST['telefono'] : 'Sin telefono.';
$direccion = isset($_POST['direccion']) ? $_POST['direccion'] : 'Sin dirección.';
$empresa = isset($_POST['empresa']) ? $_POST['empresa'] : 'Sin empresa.';
$cotizacion = isset($_POST['cotizacion']) ? $_POST['cotizacion'] : '';

// Decodificar cotización si es JSON válido
$cotizacionHTML = '';
if ($cotizacion !== '') {
    $decoded = json_decode($cotizacion, true); // <--- importante que sea string
    if (is_array($decoded)) {
        $cotizacionHTML .= "<ul>";
        foreach ($decoded as $key => $item) {
            if ($key === "0") continue; // saltar contador
            if (isset($item['Nombre'], $item['Cantidad'])) {
                $cotizacionHTML .= "<li><b>{$item['Nombre']}</b> - Cantidad: {$item['Cantidad']}</li>";
            }
        }
        $cotizacionHTML .= "</ul>";
    } else {
        $cotizacionHTML = 'No se pudo decodificar la cotización (formato inválido).';
    }
} else {
    $cotizacionHTML = 'No se recibió la cotización.';
}

// Crear una instancia de PHPMailer
$mail = new PHPMailer(true);

// Cargar las variables de entorno desde el archivo .env
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__, 'credenciales.env');
$dotenv->load();

if (!isset($_ENV['CORREO_HOST'], $_ENV['CORREO_USER'], $_ENV['CORREO_PASS'])) {
    die('⚠️ Faltan variables de entorno necesarias');
}

try {
    // Configuración del servidor
    $mail->isSMTP();                        // Usar SMTP
    $mail->Host = $_ENV['CORREO_HOST'];        // Servidor SMTP de Gmail
    $mail->SMTPAuth =  filter_var($_ENV['CORREO_SMTPA'], FILTER_VALIDATE_BOOLEAN); // true o false
    $mail->Username = $_ENV['CORREO_USER']; // Tu dirección de Gmail
    $mail->Password = $_ENV['CORREO_PASS']; // Tu contraseña de aplicación (no la de Gmail normal)
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; // $_ENV['CORREO_SMTPS'];     // Cifrado TLS (puede ser 'ssl')
    $mail->Port = (int)$_ENV['CORREO_PORT'];

    // Configurar remitente y destinatario
    $mail->setFrom($_ENV['CORREO_USER'], 'Pisueña');
    $mail->addAddress('correo@ejemplo.com', 'Destinatario');

    // Contenido del correo
    $mail->isHTML(true);
    $mail->Subject = '📨 Nuevo cotizacion desde el formulario';
    $mail->Body    = "
        <b>Nombre:</b> $nombre<br>
        <b>Correo:</b> $correo<br>
        <b>Teléfono:</b> $telefono<br>
        <b>Dirección:</b> $direccion<br>
        <b>Empresa:</b> $empresa<br><br>
        <b>Detalle de cotización:</b><br>
        $cotizacionHTML
    ";
    $mail->AltBody = "Nombre: $nombre\nCorreo: $correo\nTeléfono: $telefono\nDirección: $direccion\nEmpresa: $empresa\nCotización: $cotizacion";

    // Enviar el mensaje
    $mail->send();
    echo json_encode(['success' => true, 'message' => '✅ Correo enviado correctamente']);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => "❌ El correo no pudo enviarse. Error: {$mail->ErrorInfo}"]);
}
?>