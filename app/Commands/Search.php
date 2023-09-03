<?php

namespace App\Commands;

use App\Controllers\PokemonController;
use App\Helpers\ViewHelper;
use Illuminate\Support\Facades\Validator;
use LaravelZero\Framework\Commands\Command;

class Search extends Command
{
    protected $signature = 'search {query : The Pokémon name or ID}';

    protected $description = 'Search for info on a Pokémon';

    public function handle(PokemonController $pokemonController)
    {
        $query = $this->argument('query');

        $rules = ['query' => 'required|alpha_num'];

        $validator = Validator::make(['query' => $query], $rules);

        if ($validator->fails()) {
            $errors = $validator->errors();

            ViewHelper::render(view('error', ['errors' => $errors]));

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
