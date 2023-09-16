<?php

declare(strict_types=1);

return [

    /*
    |--------------------------------------------------------------------------
    | Hide Commands
    |--------------------------------------------------------------------------
    |
    | This option allows to hide certain commands from the summary output.
    | They will still be available in your application. Wildcards are supported
    |
    | Examples: "make:*", "list"
    |
    */

    'hide' => [
        'app:*',
        'make:*',
        'list',
        'test',
    ],

    /*
    |--------------------------------------------------------------------------
    | Custom Binary Name
    |--------------------------------------------------------------------------
    |
    | This option allows to override the Artisan binary name that is used
    | in the command usage output.
    |
    */

    'binary' => null,

];
