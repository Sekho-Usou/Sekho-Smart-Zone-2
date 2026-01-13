<?php
require_once 'bootstrap.php';
header('Content-Type: application/json');

$file = $_FILES['file'] ?? null;
if (!$file || $file['error'] !== UPLOAD_ERR_OK)
    jsonErr('No file or upload error');

$ext  = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
if (!in_array($ext, ['jpg','jpeg','png','webp']))
    jsonErr('Extension not allowed');

$name = time() . '-' . bin2hex(random_bytes(4)) . '.' . $ext;
$path = $uploadDir . $name;

if (move_uploaded_file($file['tmp_name'], $path))
    echo json_encode(['url' => $webPath . $name]);
else
    jsonErr('Move failed');

function jsonErr($m){ http_response_code(400); exit(json_encode(['error'=>$m])); }

