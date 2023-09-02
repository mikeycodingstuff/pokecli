<?php

namespace App\Commands;

use Illuminate\Console\Scheduling\Schedule;
use LaravelZero\Framework\Commands\Command;
use function Termwind\{render};
use function Termwind\{style};

class Info extends Command
{
    /**
     * The signature of the command.
     *
     * @var string
     */
    protected $signature = 'info';

    /**
     * The description of the command.
     *
     * @var string
     */
    protected $description = 'Get Pokemon info';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $pokemonAccented = config('names.accented_pokemon_string');

        $mainColor = config('colors.app.mainColor');

        style('indigo-400')->color($mainColor);
        style('main')->apply('m-1 bg-indigo-400');

        $outputString = '<div class="main">' .  ucfirst($pokemonAccented). ' </div>';

        render($outputString);
    }

    /**
     * Define the command's schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    public function schedule(Schedule $schedule): void
    {
        // $schedule->command(static::class)->everyMinute();
    }
}
