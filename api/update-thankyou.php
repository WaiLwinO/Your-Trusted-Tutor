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

if (!$input || !is_array($input)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid thank you notes data']);
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

// Validate and clean thank you notes
$cleanNotes = [];
foreach ($input as $note) {
    if (isset($note['message']) && isset($note['author']) && isset($note['timestamp'])) {
        $cleanNotes[] = [
            'message' => htmlspecialchars(trim($note['message']), ENT_QUOTES, 'UTF-8'),
            'author' => htmlspecialchars(trim($note['author']), ENT_QUOTES, 'UTF-8'),
            'timestamp' => (int)$note['timestamp']
        ];
    }
}

// Update thank you notes
$data['thankYouNotes'] = $cleanNotes;

// Save data
if (file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT))) {
    echo json_encode(['success' => true, 'count' => count($cleanNotes)]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to save thank you notes']);
}
?>