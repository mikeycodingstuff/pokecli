<?php

declare(strict_types=1);

namespace App\Commands;

use Exception;
use Illuminate\Support\Facades\Http;
use LaravelZero\Framework\Commands\Command;

use function Termwind\{render};
use function Termwind\{style};

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

        try {
            $mainColor = config('colors.main_color.hex');
            $mainColorTw = config('colors.main_color.termwind_color');
            style($mainColorTw)->color($mainColor);

            $response = Http::get("$baseUrl/pokemon/$query");
            $data = $response->json();

            $pokemon = [
                'name' => $data['name'],
                'id' => $data['id'],
                'types' => $data['types'],
                'weight' => self::decimetreToMetre($data['weight']),
                'height' => self::hectogramToKilogram($data['height']),
            ];

            $typeColors = [];
            foreach ($data['types'] as $type) {
                $typeName = $type['type']['name'];
                $typeConfig = config("colors.types.$typeName");

                $typeColors[$typeName] = $typeConfig['termwind_color'];
                style($typeConfig['termwind_color'])->color($typeConfig['hex']);
            }

            $view = view('pokemon', [
                'title' => 'pokémon info:',
                'pokemon' => $pokemon,
                'styles' => [
                    'mainColor' => $mainColorTw,
                    'typeColors' => $typeColors,
                ],
            ]);

            render(strval($view));

            return self::SUCCESS;
        } catch (Exception $e) {
            $this->error('An error occurred: '.$e->getMessage());

            return self::FAILURE;
        }
    }

    public function getRandomPokemonId(): int
    {
        $max = $this->getHighestPokemonId();

        return random_int(0, $max);
    }

    private function getHighestPokemonId()
    {
        $base_url = config('api.urls.base_url');
        $url = $base_url.'pokedex/1';

        $response = Http::get($url);

        try {
            $data = $response->json();

            $lastEntry = $data['pokemon_entries'][count($data['pokemon_entries']) - 1];

            return $lastEntry['entry_number'];
        } catch (Exception $e) {
            $this->error('An error occurred while fetching Pokémon data: '.$e->getMessage());

            return self::FAILURE;
        }
    }

    public static function hectogramToKilogram(float $HgWeight): float
    {
        return round($HgWeight * 0.1, 2);
    }

    public static function decimetreToMetre(float $DmHeight): float
    {
        return round($DmHeight * 0.1, 2);
    }
}
