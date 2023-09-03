<?php

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
