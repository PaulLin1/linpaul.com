<?php
$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

$routes = [
    '/' => './templates/index.html',
    '/blog' => './templates/blog.html',
    '/contact' => './templates/contact.html',
    '/about' => './templates/about.html',
    '/header' => './templates/header.html',
    '/nav' => './templates/nav.html',
    '/links' => './templates/links.html',
];

if (array_key_exists($path, $routes)) {
    if (file_exists($routes[$path])) {
        header("Content-Type: text/html; charset=UTF-8");
        readfile($routes[$path]);
        exit;
    } else {
        http_response_code(404);
        echo "404 Not Found";
        exit;
    }
}

// Blog dynamic routes: /blog/slug
if (strpos($path, '/blog/') === 0) {
    $slug = basename($path);
    $file = __DIR__ . "/templates/blog/$slug.html";

    if (file_exists($file)) {
        header("Content-Type: text/html; charset=UTF-8");
        readfile($file);
        exit;
    } else {
        http_response_code(404);
        echo "404 Blog Page Not Found";
        exit;
    }
}

if (strpos($path, '/static/') === 0) {
    $filePath = realpath(__DIR__ . '/./' . $path);
    if ($filePath && file_exists($filePath) && is_file($filePath)) {
        $mime = mime_content_type($filePath);
        header("Content-Type: $mime");
        readfile($filePath);
        exit;
    } else {
        http_response_code(404);
        echo "404 Not Found";
        exit;
    }
}


http_response_code(404);
echo "404 Not Found";
