<?php
/*  /admin/bootstrap.php  –  one-stop folder & path setup */
$uploadDir = __DIR__ . '/uploads/';
@mkdir($uploadDir, 0755, true);

$dataDir   = __DIR__ . '/';
$webPath   = 'admin/uploads/';   // relative to website root

