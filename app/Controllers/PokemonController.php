<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Services\PokemonService;

class PokemonController
{
    protected $pokemonService;

    public function __construct(PokemonService $pokemonService)
    {
        $this->pokemonService = $pokemonService;
    }

    public function getPokemonByNameOrId(string|int $nameOrId)
    {
        return $this->getPokemonByName($nameOrId);
    }

    public function getPokemonByName(string $name)
    {
        return $this->pokemonService->getPokemonByName($name);
    }

    public function getPokemonById(int $id)
    {
        return $this->pokemonService->getPokemonById($id);
    }
}
