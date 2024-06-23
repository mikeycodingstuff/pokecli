<?php

declare(strict_types=1);

namespace App\Commands;

use App\Helpers\ApiPokemonWrapper;
use App\Helpers\NumberHelper;
use App\Helpers\StyleHelper;
use App\Models\Pokemon;
use Exception;
use Illuminate\Http\Client\RequestException;
use Illuminate\Support\Arr;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;
use LaravelZero\Framework\Commands\Command;
use Random\RandomException;

use function Termwind\{ask, render};

class InfoCommand extends Command
{
    protected $signature = 'info
            {query? : The Pokémon name or ID}
            {--r|random : Get info on a random Pokémon}
            {--a|api : Get info via the PokéApi instead of the database.}';

    protected $description = 'Get info about a single Pokémon';

    /**
     * @throws RandomException
     */
    public function handle(): int
    {
        $query = $this->argument('query');
        $random = $this->option('random');
        $useApi = $this->option('api');

        $twOverrides = $this->setBasicStyles();

        if (!$query && !$random) {
            $view = view('ask', [
                'question' => 'Please provide the name or ID of the Pokémon you would like information on:',
                'twOverrides' => $twOverrides,
            ]);

            $query = ask(strval($view));
        }

        if ($query && $random) {
            $this->error('Please provide either a Pokémon name/ID or use the --random option, not both.');

            return self::INVALID;
        }

        if ($useApi) {
            return $this->getPokemonInfoFromApi($query, $random, $twOverrides) === 0 ? self::SUCCESS : self::FAILURE;
        }

        return $this->getPokemonInfoFromDb($query, $random, $twOverrides) === 0 ? self::SUCCESS : self::FAILURE;
    }

    protected function getPokemonInfoFromDb(int|string|null $query, bool $random, Collection $twOverrides): int
    {
        if ($random) {
            $pokemon = Pokemon::inRandomOrder()->first();

            if (!$pokemon) {
                $this->error('Database is empty. Please try searching with the Api using the --api flag, or populating the database with fetch:all');

                return self::INVALID;
            }

            $twOverrides['typeColors'] = StyleHelper::setTypeColors($pokemon->types);

            $this->createAndRenderView($pokemon, $twOverrides);

            return self::SUCCESS;
        }

        if (is_numeric($query)) {
            $pokemon = Pokemon::firstWhere('id', $query);
        } else {
            $pokemon = Pokemon::firstWhere('name', $query);
        }

        if (!$pokemon) {
            $this->error('Could not find Pokémon in the db. Please try searching with the Api using the --api flag.');

            return self::INVALID;
        }

        $twOverrides['typeColors'] = StyleHelper::setTypeColors($pokemon->types);

        $this->createAndRenderView($pokemon, $twOverrides);

        return self::SUCCESS;
    }

    /**
     * @throws RandomException
     */
    protected function getPokemonInfoFromApi(int|string $query, bool $random, Collection $twOverrides): int
    {
        if ($random) {
            $query = $this->getRandomPokemonId();
        }

        $baseUrl = config('api.urls.base_url');

        try {
            $data = Http::get("$baseUrl/pokemon/$query")->throw()->json();

            $pokemon = [
                'name' => $data['name'],
                'id' => $data['id'],
                'types' => $data['types'],
                'weight' => NumberHelper::decimetreToMetre($data['weight']),
                'height' => NumberHelper::hectogramToKilogram($data['height']),
            ];

            $pokemon = ApiPokemonWrapper::createFromArray($pokemon);
            $twOverrides['typeColors'] = StyleHelper::setTypeColors(collect($pokemon->types));

            $this->createAndRenderView($pokemon, $twOverrides);

            return self::SUCCESS;
        } catch (RequestException $e) {
            if ($e->getCode() === 404) {
                $this->error('Pokémon not found.');
            }

            return self::FAILURE;
        }
    }

    /**
     * @throws RandomException
     */
    protected function getRandomPokemonId(): int
    {
        $max = $this->getHighestPokemonId();

        return random_int(0, $max);
    }

    protected function getHighestPokemonId()
    {
        try {
            $url = config('api.urls.national_dex');
            $data = Http::get($url)->json();

            $lastEntry = Arr::last($data['pokemon_entries']);

            return $lastEntry['entry_number'];
        } catch (Exception $e) {
            $this->error('An error occurred while fetching Pokémon data: ' . $e->getMessage());

            return self::FAILURE;
        }
    }

    protected function createAndRenderView(Pokemon|ApiPokemonWrapper $pokemon, Collection $twOverrides): void
    {
        $view = view('pokemon', [
            'title' => 'pokémon info:',
            'pokemon' => $pokemon,
            'twOverrides' => $twOverrides,
        ]);

        render(strval($view));
    }

    protected function setBasicStyles(): Collection
    {
        return collect([
            'primaryColor' => StyleHelper::setPrimaryColor(),
            'bgColor' => StyleHelper::setBgColor(),
            'textColor' => StyleHelper::setTextColor(),
        ]);
    }
}
