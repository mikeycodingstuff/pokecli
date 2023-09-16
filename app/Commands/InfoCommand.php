<?php

declare(strict_types=1);

namespace App\Commands;

use LaravelZero\Framework\Commands\Command;

use function Termwind\{render};

class InfoCommand extends Command
{
    protected $signature = 'info {query? : The Pokémon name or ID} {--r|random : Get info on a random Pokémon}';

    protected $description = 'Get info about a Pokémon';

    public function handle()
    {
        $pokemon = [
            'name' => 'Bulbasaur',
            'id' => '1',
            'types' => [
                [
                    'slot' => 1,
                    'type' => [
                        'name' => 'grass',
                    ],
                ],
                [
                    'slot' => 2,
                    'type' => [
                        'name' => 'poison',
                    ],
                ],
            ],
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
