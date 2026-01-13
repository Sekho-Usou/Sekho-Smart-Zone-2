<?php
require_once 'bootstrap.php';
header('Content-Type: application/json');

$input = json_decode(file_get_contents('php://input'), true);
if (!$input) jsonErr('Bad JSON');

$dbFile = $dataDir . 'db.json';
$db = file_exists($dbFile) ? json_decode(file_get_contents($dbFile), true) : [];

/* if we receive an array → delete sent the whole array */
if (isset($input[0]) && is_array($input[0])){
    file_put_contents($dbFile, json_encode($input, JSON_PRETTY_PRINT));
    echo json_encode(['ok'=>true]);
    exit;
}

/* else single product upsert */
$idx = array_search($input['id'], array_column($db, 'id'));
if ($idx === false) $db[] = $input; else $db[$idx] = $input;

file_put_contents($dbFile, json_encode($db, JSON_PRETTY_PRINT));
echo json_encode(['ok'=>true]);

function jsonErr($m){ http_response_code(400); exit(json_encode(['error'=>$m])); }

