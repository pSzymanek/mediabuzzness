<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'Nieprawidłowa metoda żądania.']);
    exit;
}

if (!empty($_POST['company'] ?? '')) {
    echo json_encode(['ok' => true, 'message' => 'Dziękujemy.']);
    exit;
}

$name = trim((string) ($_POST['name'] ?? ''));
$email = trim((string) ($_POST['email'] ?? ''));
$phone = trim((string) ($_POST['phone'] ?? ''));
$message = trim((string) ($_POST['message'] ?? ''));

if ($name === '' || $email === '' || $message === '') {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'Uzupełnij wymagane pola formularza.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'message' => 'Podaj poprawny adres e-mail.']);
    exit;
}

$clean = static function (string $value): string {
    return str_replace(["\r", "\n"], ' ', $value);
};

$to = 'info@mediabuzzness.pl';
$subject = 'Zapytanie ze strony - ' . $clean($name);
if (function_exists('mb_encode_mimeheader')) {
    $subject = mb_encode_mimeheader($subject, 'UTF-8');
}
$body = implode("\n", [
    'Nowa wiadomość z formularza na stronie mediabuzzness.pl',
    '',
    'Imię i nazwisko: ' . $name,
    'E-mail: ' . $email,
    'Telefon: ' . ($phone !== '' ? $phone : 'Nie podano'),
    '',
    'Wiadomość:',
    $message,
]);

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: MediaBuzzness <no-reply@mediabuzzness.pl>',
    'Reply-To: ' . $clean($name) . ' <' . $clean($email) . '>',
];

$sent = mail($to, $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    http_response_code(500);
    echo json_encode([
        'ok' => false,
        'message' => 'Nie udało się wysłać wiadomości. Napisz bezpośrednio na info@mediabuzzness.pl.',
    ]);
    exit;
}

echo json_encode(['ok' => true, 'message' => 'Wiadomość została wysłana.']);
