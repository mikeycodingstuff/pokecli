<?php

namespace App\Helpers;

use App\Services\StyleManager;

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

    public static function renderPokemonView($data)
    {
        $pokemonData = FormatDataHelper::formatPokemonData($data);

        $mainColorConfig = config('colors.app.mainColor');
        $mainColor = $mainColorConfig['hex'];
        $replaceColorClass = $mainColorConfig['replace'];

        $bgColor = StyleManager::applyStyleBg($mainColor, 'bgColor', $replaceColorClass);

        $typeColors = [];

        foreach ($pokemonData['types'] as $type) {
            $typeName = $type['type']['name'];

            $typeConfig = config("colors.types.$typeName");

            $typeColors[$typeName] = [
                'replace' => $typeConfig['replace'],
                'newClassName' => $typeName,
            ];

            StyleManager::setColor($typeConfig['hex'], $typeConfig['replace']);
        }

        ViewHelper::renderView('pokemon', [
            'styles' => ['bgColor' => $bgColor],
            'data' => $pokemonData, 'typeColors' => $typeColors,
        ]);
    }
}
