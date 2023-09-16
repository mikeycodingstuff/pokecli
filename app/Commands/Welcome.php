<?php

declare(strict_types=1);

namespace App\Commands;

use App\Helpers\ViewHelper;
use App\Services\StyleManager;
use LaravelZero\Framework\Commands\Command;

class Welcome extends Command
{
    protected $signature = 'welcome';

    protected $description = 'Print welcome';

    public function handle(): int
    {
        $mainColor = config('colors.app.mainColor.hex');
        $replaceColorClass = config('colors.app.mainColor.replace');

        StyleManager::applyStyleBg($mainColor, $bgColor = 'bgColor', $replaceColorClass);

        ViewHelper::renderView('welcome', ['bgColor' => $bgColor]);

        return self::SUCCESS;
    }
}
