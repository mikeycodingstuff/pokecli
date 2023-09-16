<?php

declare(strict_types=1);

namespace App\Commands;

use Exception;
use Illuminate\Support\Facades\Http;
use LaravelZero\Framework\Commands\Command;

use function Termwind\{render};

class InfoCommand extends Command
{
    protected $signature = 'info {query? : The Pokémon name or ID} {--r|random : Get info on a random Pokémon}';

    protected $description = 'Get info about a Pokémon';

    public function handle()
    {
        $query = $this->argument('query');
        $random = $this->option('random');

        if (! $query && ! $random) {
            $this->error('Please provide a Pokémon name or ID, or use the --random or -r option to get a random Pokémon.');

            return self::INVALID;
        }

        if ($random) {
            $query = $this->getRandomPokemonId();
        }

        $baseUrl = config('api.urls.base_url');
        $response = Http::get("$baseUrl/pokemon/$query");
        $data = $response->json();

        $pokemon = [
            'name' => $data['name'],
            'id' => $data['id'],
            'types' => $data['types'],
            'weight' => $this->decimetreToMetre($data['weight']),
            'height' => $this->hectogramToKilogram($data['height']),
        ];

        $view = view('pokemon', [
            'title' => 'Pokémon Info:',
            'pokemon' => $pokemon,
        ]);

        render(strval($view));

        return self::SUCCESS;
    }

    public function getRandomPokemonId(): int
    {
        $max = static::getHighestPokemonId();

        return random_int(0, $max);
    }

    private static function getHighestPokemonId()
    {
        $base_url = config('api.urls.base_url');
        $url = $base_url.'pokedex/1';

        $response = Http::get($url);

        try {
            $data = $response->json();

            $lastEntry = $data['pokemon_entries'][count($data['pokemon_entries']) - 1];

            return $lastEntry['entry_number'];
        } catch (Exception $e) {

        }
    }

    private static function hectogramToKilogram(float $HgWeight): float
    {
        return $HgWeight * 0.1;
    }

    private static function decimetreToMetre(float $DmHeight): float
    {
        return $DmHeight * 0.1;
    }
}
