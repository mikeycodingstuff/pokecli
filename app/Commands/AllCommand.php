<?php

declare(strict_types=1);

namespace App\Commands;

use Exception;
use Illuminate\Support\Facades\Http;
use LaravelZero\Framework\Commands\Command;

use function Termwind\render;
use function Termwind\style;

class AllCommand extends Command
{
    protected $signature = 'all';

    protected $description = 'Get a list of all Pokémon';

    public function handle()
    {
        $baseUrl = config('api.urls.base_url');

        try {
            $mainColor = config('colors.main_color.hex');
            $mainColorTw = config('colors.main_color.termwind_color');
            style($mainColorTw)->color($mainColor);

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
                'styles' => [
                    'mainColor' => $mainColorTw,
                ],
            ]);

            render(strval($view));

            return self::SUCCESS;
        } catch (Exception $e) {
            $this->error('An error occurred: '.$e->getMessage());

            return self::FAILURE;
        }
    }
}
