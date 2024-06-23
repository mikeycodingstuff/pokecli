<?php

declare(strict_types=1);

namespace App\Commands;

use App\Helpers\ApiPokemonWrapper;
use App\Helpers\StyleHelper;
use App\Models\Pokemon;
use Exception;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;
use LaravelZero\Framework\Commands\Command;

use function Termwind\render;

class AllCommand extends Command
{
    protected $signature = 'all {--a|api : Get info via the PokéApi instead of the database.}';

    protected $description = 'Get a list of all Pokémon';

    public function handle(): int
    {
        $useApi = $this->option('api');

        $twOverrides = StyleHelper::setBasicStyles();

        if ($useApi) {
            return $this->getPokemonFromApi($twOverrides) === 0 ? self::SUCCESS : self::FAILURE;
        }

        return $this->getPokemonFromDb($twOverrides) === 0 ? self::SUCCESS : self::FAILURE;
    }

    protected function getPokemonFromDb(Collection $twOverrides): int
    {
        $pokemons = Pokemon::all();

        if (!$pokemons) {
            $this->error('Could not find Pokémon in the db. Please try searching with the Api using the --api flag.');

            return self::INVALID;
        }

        $this->createAndRenderView($pokemons, $twOverrides);

        return self::SUCCESS;
    }

    protected function getPokemonFromApi(Collection $twOverrides): int
    {
        try {
            $url = config('api.urls.national_dex');
            $data = Http::get($url)->json();

            $pokemons = collect();

            foreach ($data['pokemon_entries'] as $pokemon) {
                $pokemon = ApiPokemonWrapper::createFromArray([
                    'id' => $pokemon['entry_number'],
                    'name' => $pokemon['pokemon_species']['name'],
                ]);

                $pokemons->push($pokemon);
            }

            $this->createAndRenderView($pokemons, $twOverrides);

            return self::SUCCESS;
        } catch (Exception $e) {
            $this->error("Error: {$e->getMessage()}");

            return self::FAILURE;
        }
    }

    protected function createAndRenderView($pokemons, Collection $twOverrides): void
    {
        $view = view('pokemon-list', [
            'title' => 'all pokémon:',
            'pokemons' => $pokemons,
            'twOverrides' => $twOverrides,
        ]);

        render(strval($view));
    }
}
