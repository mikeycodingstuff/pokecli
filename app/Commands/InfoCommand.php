<?php

declare(strict_types=1);

namespace App\Commands;

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

        if (!$query && !$random) {
            $this->error('Please provide a Pokémon name or ID, or use the --random or -r option to get a random Pokémon.');

            return self::INVALID;
        }

        $baseUrl = config('api.urls.base_url');
        $response = Http::get("$baseUrl/pokemon/$query");
        $data = $response->json();

        $pokemon = [
            'name' => $data['name'],
            'id' => $data['id'],
            'types' => $data['types']
        ];

        render(
            strval(
                view('pokemon', [
                    'title' => 'Pokémon Info:',
                    'pokemon' => $pokemon,
                ])
            )
        );
    }
}
