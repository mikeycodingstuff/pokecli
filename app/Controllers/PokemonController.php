<?php

declare(strict_types=1);

namespace App\Controllers;

use App\Services\ApiService;

class PokemonController
{
    protected $ApiService;

    public function __construct(ApiService $ApiService)
    {
        $this->ApiService = $ApiService;
    }

    public function getPokemonByNameOrId(string|int $nameOrId)
    {
        if (is_numeric($nameOrId)) {
            $id = intval($nameOrId);

            return $this->getPokemonById($id);
        } else {
            $name = strval($nameOrId);

            return $this->getPokemonByName($name);
        }
    }

    public function getPokemonByName(string $name)
    {
        return $this->ApiService->getPokemonByName($name);
    }

    public function getPokemonById(int $id)
    {
        return $this->ApiService->getPokemonById($id);
    }

    public function getRandomPokemonId()
    {
        return $this->ApiService->getRandomPokemonId();
    }
}
