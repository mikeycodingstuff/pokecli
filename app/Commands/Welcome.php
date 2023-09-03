<?php

namespace App\Commands;

use App\Helpers\ViewHelper;
use App\Services\StyleManager;
use Illuminate\Console\Scheduling\Schedule;
use LaravelZero\Framework\Commands\Command;

use function Termwind\{render};

class Welcome extends Command
{
    /**
     * The signature of the command.
     *
     * @var string
     */
    protected $signature = 'welcome';

    /**
     * The description of the command.
     *
     * @var string
     */
    protected $description = 'Print welcome';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $mainColor = config('colors.app.mainColor');

        StyleManager::applyStyleBg($mainColor, $bgColor = 'bgColor', 'indigo-400');

        ViewHelper::render(view('welcome', ['bgColor' => $bgColor]));
    }

    /**
     * Define the command's schedule.
     */
    public function schedule(Schedule $schedule): void
    {
        // $schedule->command(static::class)->everyMinute();
    }
}
