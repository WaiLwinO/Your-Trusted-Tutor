<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Path to data file
$dataFile = '../data.json';

// Get input data
$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['count'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid subscriber data']);
    exit;
}

// Read existing data
$data = [];
if (file_exists($dataFile)) {
    $data = json_decode(file_get_contents($dataFile), true);
    if ($data === null) {
        $data = [];
    }
}

// Update subscriber data
$data['subscribers'] = [
    'count' => (int)$input['count'],
    'lastUpdated' => isset($input['lastUpdated']) ? $input['lastUpdated'] : time() * 1000
];

// Save data
if (file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT))) {
    echo json_encode(['success' => true, 'subscribers' => $data['subscribers']]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save subscriber data']);
}
?>