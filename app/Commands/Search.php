<?php

declare(strict_types=1);

namespace App\Commands;

use App\Controllers\PokemonController;
use App\Helpers\ViewHelper;
use App\Services\ValidationService;
use LaravelZero\Framework\Commands\Command;

class Search extends Command
{
    public function __construct(
        protected PokemonController $pokemonController,
        protected ValidationService $validationService
    ) {
        parent::__construct();
    }

    protected $signature = 'search {query? : The Pokémon name or ID} {--r|random : Get a random Pokémon}';

    protected $description = 'Search for info on a Pokémon';

    public function handle()
    {
        $query = $this->argument('query');
        $random = $this->option('random');

        if (! $query && ! $random) {
            $this->error('Please provide a Pokémon name or ID, or use the --random or -r option to get a random Pokémon.');

            return self::INVALID;
        }

        if ($random) {
            $query = $this->pokemonController->getRandomPokemonId();
        }

        $validator = $this->validationService->validatePokemonQuery($query);

        if ($validator->fails()) {
            ViewHelper::renderValidationErrorView($validator->errors());

            return self::INVALID;
        }

        $responseData = $this->pokemonController->getPokemonByNameOrId($query);

        if ($responseData) {
            ViewHelper::renderPokemonView($responseData);

            return self::SUCCESS;
        } else {
            $this->error('Pokémon not found.');

            return self::FAILURE;
        }
    }
}
