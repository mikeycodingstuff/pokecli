<?php

declare(strict_types=1);

namespace App\Commands;

use App\Helpers\ViewHelper;
use App\Services\StyleManager;
use Illuminate\Console\Scheduling\Schedule;
use LaravelZero\Framework\Commands\Command;

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
        $mainColor = config('colors.app.mainColor.hex');
        $replaceColorClass = config('colors.app.mainColor.replace');

        StyleManager::applyStyleBg($mainColor, $bgColor = 'bgColor', $replaceColorClass);

        ViewHelper::renderView('welcome', ['bgColor' => $bgColor]);

        return self::SUCCESS;
    }

    /**
     * Define the command's schedule.
     */
    public function schedule(Schedule $schedule): void
    {
        // $schedule->command(static::class)->everyMinute();
    }
}
