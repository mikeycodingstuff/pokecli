<?php

namespace App\Commands;

use App\Controllers\PokemonController;
use App\Helpers\ViewHelper;
use App\Services\FormatDataService;
use App\Services\StyleManager;
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

            return self::INVALID;
        }

        $responseData = $this->pokemonController->getPokemonByNameOrId($query);

        if ($responseData) {
            $pokemonData = $this->formatDataService->formatData($responseData);

            $mainColor = config('colors.app.mainColor');

            StyleManager::applyStyleBg($mainColor, $bgColor = 'bgColor', 'indigo-400');

            ViewHelper::renderView('pokemon', ['styles' => ['bgColor' => $bgColor], 'data' => $pokemonData]);

            return self::SUCCESS;
        } else {
            $this->error('Pokémon not found.');

            return self::FAILURE;
        }
    }
}
