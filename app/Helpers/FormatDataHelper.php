<?php

declare(strict_types=1);

namespace App\Helpers;

class FormatDataHelper
{
    public static function formatPokemonData($data): array
    {
        return [
            'id' => $data['id'],
            'name' => $data['name'],
            'types' => $data['types'],
        ];
    }
}
