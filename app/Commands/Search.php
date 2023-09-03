<?php

namespace App\Commands;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Support\Facades\Validator;
use LaravelZero\Framework\Commands\Command;
use App\Helpers\ViewHelper;

use function Termwind\{render};

class Search extends Command
{
    /**
     * The signature of the command.
     *
     * @var string
     */
    protected $signature = 'search {query : The Pokémon name or ID}';

    /**
     * The description of the command.
     *
     * @var string
     */
    protected $description = 'Search for info on a Pokémon';

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        $query = $this->argument('query');

        $rules = ['query' => 'required|alpha_num'];

        $validator = Validator::make(['query' => $query], $rules);

        if ($validator->fails()) {
            $errors = $validator->errors();

            // $this->line('');
            // $this->error("Error:");
            // $this->line($errors->first('query') . "\n");

            // $message = sprintf(
            //     "\n  <error>Error:</>\n  <fg=white>%s</>\n",
            //     trim($errors->first('query')),
            // );
            // $this->comment($message);

            ViewHelper::render(view('error', ['errors' => $errors]));

            return 1;
        }
    }

    /**
     * Define the command's schedule.
     */
    public function schedule(Schedule $schedule): void
    {
        // $schedule->command(static::class)->everyMinute();
    }
}
