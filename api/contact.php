<?php
/**
 * SINOTRUK Contact Form - Feishu Webhook Integration
 * 
 * This endpoint receives form submissions from the Contact page
 * and forwards them to a Feishu (Lark) bot webhook.
 * 
 * Setup:
 * 1. Create a Feishu bot in your group chat
 * 2. Copy the webhook URL
 * 3. Replace FEISHU_WEBHOOK_URL below
 */

// ============================================
// CONFIGURATION - Replace with your Feishu webhook URL
// ============================================
define('FEISHU_WEBHOOK_URL', 'https://open.feishu.cn/open-apis/bot/v2/hook/0a8ca31f-bcd9-4079-8085-514663ae7ddd');

// Allowed origins (CORS)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Only accept POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

// Parse JSON body
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid request data']);
    exit;
}

// Validate required fields
$required = ['name', 'phone', 'email', 'country', 'message'];
foreach ($required as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => "Missing required field: $field"]);
        exit;
    }
}

// Sanitize inputs
$name    = htmlspecialchars(trim($input['name']), ENT_QUOTES, 'UTF-8');
$phone   = htmlspecialchars(trim($input['phone']), ENT_QUOTES, 'UTF-8');
$email   = htmlspecialchars(trim($input['email']), ENT_QUOTES, 'UTF-8');
$country = htmlspecialchars(trim($input['country']), ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars(trim($input['message']), ENT_QUOTES, 'UTF-8');
$time    = date('Y-m-d H:i:s');
$ip      = $_SERVER['REMOTE_ADDR'] ?? 'Unknown';

// Build Feishu card message
$feishuPayload = [
    'msg_type' => 'interactive',
    'card' => [
        'header' => [
            'title' => [
                'content' => 'New Inquiry from sinotrukteam.com',
                'tag'     => 'plain_text'
            ],
            'template' => 'turquoise'
        ],
        'elements' => [
            [
                'tag'  => 'div',
                'text' => [
                    'tag'     => 'lark_md',
                    'content' => "**Time:** $time\n**IP:** $ip"
                ]
            ],
            ['tag' => 'hr'],
            [
                'tag'  => 'div',
                'text' => [
                    'tag'     => 'lark_md',
                    'content' => "**Name:** $name"
                ]
            ],
            [
                'tag'  => 'div',
                'text' => [
                    'tag'     => 'lark_md',
                    'content' => "**Phone/WhatsApp:** $phone"
                ]
            ],
            [
                'tag'  => 'div',
                'text' => [
                    'tag'     => 'lark_md',
                    'content' => "**Email:** $email"
                ]
            ],
            [
                'tag'  => 'div',
                'text' => [
                    'tag'     => 'lark_md',
                    'content' => "**Country:** $country"
                ]
            ],
            ['tag' => 'hr'],
            [
                'tag'  => 'div',
                'text' => [
                    'tag'     => 'lark_md',
                    'content' => "**Message:**\n$message"
                ]
            ]
        ]
    ]
];

// Send to Feishu
$ch = curl_init(FEISHU_WEBHOOK_URL);
curl_setopt_array($ch, [
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => json_encode($feishuPayload),
    CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 15,
    CURLOPT_SSL_VERIFYPEER => true,
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

if ($curlError) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to send notification']);
    exit;
}

$feishuResult = json_decode($response, true);

// Feishu returns {"code":0,"msg":"success"} on success
if ($httpCode === 200 && isset($feishuResult['code']) && $feishuResult['code'] === 0) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Notification service error']);
}