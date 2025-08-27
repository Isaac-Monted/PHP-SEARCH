<?php
// Importar las clases necesarias
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Cargar el autoload de Composer
require __DIR__ . '/../vendor/autoload.php';

// Encabezado JSON
header('Content-Type: application/json');

//file_put_contents("debug.log", print_r($_POST, true));

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

// Lista de correos adicionales a los que también se les enviará el correo
$correosAdicionales = [
    'isaacmonted072@gmail.com',
    'rimora.29@gmail.com'
];

// Crear una instancia de PHPMailer
$mail = new PHPMailer(true);
// Codificar los caracteres en el formato estandar
$mail->CharSet = 'UTF-8';
$mail->Encoding = 'base64';

// Cargar las variables de entorno desde el archivo .env
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../../usuario', 'credenciales.env');
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
    $mail->SMTPSecure = $_ENV['CORREO_SMTPS'];  // PHPMailer::ENCRYPTION_STARTTLS; // $_ENV['CORREO_SMTPS']; // Cifrado TLS (puede ser 'ssl')
    $mail->Port = (int)$_ENV['CORREO_PORT'];

    // 🔐 Forzar uso de cacert.pem
    /*$mail->SMTPOptions = [
        'ssl' => [
            'verify_peer'       => true,
            'verify_peer_name'  => true,
            'allow_self_signed' => false,
            'cafile'            => 'C:/xampp/php/extras/ssl/cacert.pem',
        ],
    ];*/

    // Configurar remitente y destinatario
    $mail->setFrom($_ENV['CORREO_USER'], 'Ferreteria Pisueña');
    $mail->addAddress($correo, $nombre);

    // Añadir los correos adicionales
    foreach ($correosAdicionales as $correoAdicional) {
        $mail->addAddress($correoAdicional);  // Agregar destinatarios adicionales
    }

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