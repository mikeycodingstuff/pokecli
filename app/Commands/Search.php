<?php

namespace App\Commands;

use App\Controllers\PokemonController;
use App\Helpers\ViewHelper;
use App\Services\FormatDataService;
use App\Services\ValidationService;
use LaravelZero\Framework\Commands\Command;

class Search extends Command
{
    public function __construct(
        protected PokemonController $pokemonController,
        protected ValidationService $validationService,
        protected FormatDataService $formatDataService
    ) {
        parent::__construct();
    }

    protected $signature = 'search {query : The Pokémon name or ID}';

    protected $description = 'Search for info on a Pokémon';

    public function handle()
    {
        $query = $this->argument('query');

        $validator = $this->validationService->validatePokemonQuery($query);

        if ($validator->fails()) {
            ViewHelper::renderErrorView($validator->errors());

            return 1;
        }

        $responseData = $this->pokemonController->getPokemonByNameOrId($query);

        if ($responseData) {
            $pokemonData = $this->formatDataService->formatData($responseData);

            ViewHelper::renderView('pokemon', $pokemonData);

            return 0;
        } else {
            $this->error('Pokémon not found.');

            return 1;
        }
    }
}
