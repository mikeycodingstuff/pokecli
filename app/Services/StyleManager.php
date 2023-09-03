<?php

namespace App\Services;

use function Termwind\style;

class StyleManager
{
    /**
     * Overrides a termwind color class with a custom color.
     *
     * @param  string  $color e.g. '#7B62AC'
     * @param  string  $twColorToUpdate e.g. 'green-500'
     * @return void
     */
    public static function setColor(string $color, string $twColorToUpdate)
    {
        style($twColorToUpdate)->color($color);
    }

    /**
     * Overrides a termwind color class with a custom color.
     * Uses that new color to create a class that applies updated termwind styles dynamically using a prefix.
     *
     * @param  string  $color e.g. '#7B62AC'
     * @param  string  $newClassName e.g. bgColor
     * @param  string  $twColorToUpdate e.g. 'green-500'
     * @param  string  $twClassPrefix e.g. 'bg'
     * @return string  $newClassName returns the new class name to be used in tw
     */
    public static function applyStyle(string $color, string $newClassName, string $twColorToUpdate, string $twClassPrefix): string
    {
        static::setColor($color, $twColorToUpdate);

        style($newClassName)->apply("$twClassPrefix-$twColorToUpdate");

        return $newClassName;
    }

    /**
     * Sets the bg to a custom color with a class name.
     *
     * @param  string  $color e.g. '#7B62AC'
     * @param  string  $newClassName e.g. bgColor
     * @param  string  $twColorToUpdate e.g. 'green-500'
     * @return string  $newClassName returns the new class name to be used in tw
     */
    public static function applyStyleBg(string $color, string $newClassName, string $twColorToUpdate): string
    {
        return static::applyStyle($color, $newClassName, $twColorToUpdate, 'bg');
    }

    /**
     * Sets the text to a custom color with a class name.
     *
     * @param  string  $color e.g. '#7B62AC'
     * @param  string  $newClassName e.g. textColor
     * @param  string  $twColorToUpdate e.g. 'green-500'
     * @return string  $newClassName returns the new class name to be used in tw
     */
    public static function applyStyleText(string $color, string $newClassName, string $twColorToUpdate): string
    {
        return static::applyStyle($color, $newClassName, $twColorToUpdate, 'text');
    }
}
