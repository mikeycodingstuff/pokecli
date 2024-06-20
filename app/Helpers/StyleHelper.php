<?php

declare(strict_types=1);

namespace App\Helpers;

use function Termwind\style;

class StyleHelper
{
    public static function setMainColor(): string
    {
        $mainColor = config('colors.main_color');
        style($mainColor['termwind_color'])->color($mainColor['hex']);

        return $mainColor['termwind_color'];
    }
}
