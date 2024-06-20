<?php

declare(strict_types=1);

namespace App\Helpers;

class NumberHelper
{
    public static function hectogramToKilogram(float $HgWeight): float
    {
        return round($HgWeight * 0.1, 2);
    }

    public static function decimetreToMetre(float $DmHeight): float
    {
        return round($DmHeight * 0.1, 2);
    }
}
