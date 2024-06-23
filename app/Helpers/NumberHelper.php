<?php

declare(strict_types=1);

namespace App\Helpers;

class NumberHelper
{
    public static function hectogramToKilogram(float $HgWeight): float
    {
        return self::divideByTen($HgWeight);
    }

    public static function decimetreToMetre(float $DmHeight): float
    {
        return self::divideByTen($DmHeight);
    }

    private static function divideByTen(float $value): float
    {
        return round($value * 0.1, 2);
    }
}
