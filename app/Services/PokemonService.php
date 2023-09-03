<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\Http;

class PokemonService
{
    public function getPokemonByName(string $name)
    {
        return static::getSinglePokemon($name);
    }

    public function getPokemonById(int $id)
    {
        return static::getSinglePokemon($id);
    }

    private static function getSinglePokemon(string|int $query)
    {
        $base_url = config('api.urls.base_url');
        $url = $base_url."pokemon/$query";

        $response = Http::get($url);

        if ($response->successful()) {
            return $response->json();
        }

        return null;
    }
}
