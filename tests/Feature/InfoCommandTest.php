<?php

declare(strict_types=1);

it('displays pokemon info', function () {
    $this->artisan('info')->assertExitCode(0);
});
