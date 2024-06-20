<?php

declare(strict_types=1);

namespace App\Helpers;

use function Termwind\style;

class StyleHelper
{
    public static function setMainBgColor(): string
    {
        $mainBgColor = config('colors.main_bg_color');
        style($mainBgColor['termwind_color'])->color($mainBgColor['hex']);

        return $mainBgColor['termwind_color'];
    }
}
