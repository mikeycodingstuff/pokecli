<?php

namespace App\Helpers;

use function Termwind\{render};

class ViewHelper
{
    public static function renderView(string $template, array $props)
    {
        $view = view($template, $props);

        return render(strval($view));
    }

    public static function renderValidationErrorView($errors)
    {
        return static::renderView('validationError', ['errors' => $errors]);
    }
}
