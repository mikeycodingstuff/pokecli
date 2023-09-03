<?php

namespace App\Commands;

use App\Services\StyleManager;
use Illuminate\Console\Scheduling\Schedule;
use LaravelZero\Framework\Commands\Command;
use function Termwind\{render};

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

        StyleManager::applyStyleBg($mainColor, $bgColor = 'bgColor', 'indigo-400');

        $view = view('title', ['title' => $pokemonAccented, 'bgColor' => $bgColor]);
        render(strval($view));
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
