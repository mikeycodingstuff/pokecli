<?php

namespace App\Commands;

use App\Controllers\PokemonController;
use App\Helpers\ViewHelper;
use App\Services\ValidationService;
use LaravelZero\Framework\Commands\Command;

class Search extends Command
{
    protected $signature = 'search {query : The Pokémon name or ID}';

    protected $description = 'Search for info on a Pokémon';

    public function handle(PokemonController $pokemonController, ValidationService $validationService)
    {
        $query = $this->argument('query');

        $validator = $validationService->validatePokemonQuery($query);

        if ($validator->fails()) {
            ViewHelper::renderErrorView($validator->errors());

            return 1;
        }

        $pokemonData = $pokemonController->getPokemonByNameOrId($query);

        if ($pokemonData) {
            $this->info(json_encode($pokemonData, JSON_PRETTY_PRINT));

            return 0;
        } else {
            $this->error('Pokémon not found.');

            return 1;
        }
    }
}
