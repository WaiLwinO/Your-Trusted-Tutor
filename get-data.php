<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

// Path to data file
$dataFile = '../data.json';

// Check if data file exists
if (!file_exists($dataFile)) {
    // Create default data if file doesn't exist
    $defaultData = [
        'subscribers' => [
            'count' => 1247,
            'lastUpdated' => time() * 1000
        ],
        'thankYouNotes' => [
            [
                'message' => 'Thank you for making learning accessible to everyone!',
                'author' => 'Sarah M.',
                'timestamp' => (time() - 86400) * 1000
            ],
            [
                'message' => 'Your videos helped me pass my GED. I\'m now in college!',
                'author' => 'Mike T.',
                'timestamp' => (time() - 172800) * 1000
            ],
            [
                'message' => 'Amazing content and great explanations. Keep up the good work!',
                'author' => 'Lisa K.',
                'timestamp' => (time() - 259200) * 1000
            ]
        ]
    ];
    
    file_put_contents($dataFile, json_encode($defaultData, JSON_PRETTY_PRINT));
}

// Read and return data
$data = file_get_contents($dataFile);
$jsonData = json_decode($data, true);

if ($jsonData === null) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to read data']);
} else {
    echo json_encode($jsonData);
}
?>