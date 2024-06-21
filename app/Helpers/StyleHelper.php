<?php

declare(strict_types=1);

namespace App\Helpers;

use Illuminate\Support\Collection;

use function Termwind\style;

class StyleHelper
{
    /**
     * Uses the color config to set a style in termwind.
     * e.g. changing yellow-100 to #A8A878.
     *
     * @return string termwind color to be passed to the view.
     */
    public static function setColor(string $colorName): string
    {
        $color = config("colors.$colorName");
        style($color['termwind'])->color($color['hex']);

        return $color['termwind'];
    }

    public static function setprimaryColor(): string
    {
        return static::setColor('primary_color');
    }

    public static function setBgColor(): string
    {
        return static::setColor('bg_color');
    }

    public static function setTextColor(): string
    {
        return static::setColor('text_color');
    }

    public static function setTypeColors(Collection $types): Collection
    {
        return $types->mapWithKeys(function ($type) {
            $typeMap = config("colors.types.$type->name");
            style($typeMap['termwind'])->color($typeMap['hex']);

            return [$type->name => $typeMap['termwind']];
        });
    }
}
