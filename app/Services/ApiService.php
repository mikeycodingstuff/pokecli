<?php

declare(strict_types=1);

namespace App\Services;

use Exception;
use Illuminate\Support\Facades\Http;

class ApiService
{
    public function getPokemonByName(string $name)
    {
        return static::getSinglePokemon($name);
    }

    public function getPokemonById(int $id)
    {
        return static::getSinglePokemon($id);
    }

    public static function getRandomPokemon()
    {
        $id = static::getHighestPokemonId();

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

    private static function getHighestPokemonId()
    {
        $base_url = config('api.urls.base_url');
        $url = $base_url."pokedex/1";

        $response = Http::get($url);

        try {
            $data = $response->json();

            $lastEntry = $data['pokemon_entries'][count($data['pokemon_entries']) - 1];
            
            return $lastEntry['entry_number'];
        } catch (Exception $e) {

        }
    }
}
