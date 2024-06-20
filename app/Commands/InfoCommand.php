<?php

declare(strict_types=1);

namespace App\Commands;

use App\Helpers\NumberHelper;
use App\Helpers\StyleHelper;
use Exception;
use Illuminate\Support\Facades\Http;
use LaravelZero\Framework\Commands\Command;
use Random\RandomException;

use function Termwind\{ask, render, style};

class InfoCommand extends Command
{
    protected $signature = 'info {query? : The Pokémon name or ID} {--r|random : Get info on a random Pokémon}';

    protected $description = 'Get info about a single Pokémon';

    /**
     * @throws RandomException
     */
    public function handle(): int
    {
        $query = $this->argument('query');
        $random = $this->option('random');

        $mainColor = StyleHelper::setMainColor();

        if (!$query && !$random) {
            $view = view('ask', [
                'question' => 'Please provide the name or ID of the Pokémon you would like information on:',
                'styles' => [
                    'mainColor' => $mainColor,
                ],
            ]);

            $query = ask(strval($view));
        }

        if ($query && $random) {
            $this->error('Please provide either a Pokémon name/ID or use the --random option, not both.');

            return self::INVALID;
        }

        if ($random) {
            $query = $this->getRandomPokemonId();
        }

        $baseUrl = config('api.urls.base_url');

        try {
            $response = Http::get("$baseUrl/pokemon/$query");
            $data = $response->json();

            $pokemon = [
                'name' => $data['name'],
                'id' => $data['id'],
                'types' => $data['types'],
                'weight' => NumberHelper::decimetreToMetre($data['weight']),
                'height' => NumberHelper::hectogramToKilogram($data['height']),
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
                    'mainColor' => $mainColor,
                    'typeColors' => $typeColors,
                ],
            ]);

            render(strval($view));

            return self::SUCCESS;
        } catch (Exception $e) {
            $this->error('An error occurred: ' . $e->getMessage());

            return self::FAILURE;
        }
    }

    /**
     * @throws RandomException
     */
    public function getRandomPokemonId(): int
    {
        $max = $this->getHighestPokemonId();

        return random_int(0, $max);
    }

    private function getHighestPokemonId()
    {
        try {
            $url = config('api.urls.national_dex');
            $data = Http::get($url)->json();

            $lastEntry = end($data['pokemon_entries']);

            return $lastEntry['entry_number'];
        } catch (Exception $e) {
            $this->error('An error occurred while fetching Pokémon data: ' . $e->getMessage());

            return self::FAILURE;
        }
    }
}
