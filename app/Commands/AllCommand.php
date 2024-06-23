<?php

declare(strict_types=1);

namespace App\Commands;

use App\Helpers\StyleHelper;
use Exception;
use Illuminate\Support\Facades\Http;
use LaravelZero\Framework\Commands\Command;

use function Termwind\render;

class AllCommand extends Command
{
    protected $signature = 'all';

    protected $description = 'Get a list of all Pokémon';

    public function handle(): int
    {
        $baseUrl = config('api.urls.base_url');

        try {
            $primaryColor = StyleHelper::setPrimaryColor();

            $response = Http::get("$baseUrl/pokedex/1");
            $data = $response->json();
            $pokemons = [];

            foreach ($data['pokemon_entries'] as $pokemon) {
                $pokemons[] = [
                    'id' => $pokemon['entry_number'],
                    'name' => $pokemon['pokemon_species']['name'],
                ];
            }

            $view = view('pokemon-list', [
                'title' => 'all pokémon:',
                'pokemons' => $pokemons,
                'twOverrides' => [
                    'primaryColor' => $primaryColor,
                ],
            ]);

            render(strval($view));

            return self::SUCCESS;
        } catch (Exception $e) {
            $this->error('An error occurred: ' . $e->getMessage());

            return self::FAILURE;
        }
    }
}
