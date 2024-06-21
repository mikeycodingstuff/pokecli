<?php

declare(strict_types=1);

namespace App\Helpers;

class ApiTypeWrapper
{
    public function __construct(
        public string $name,
    ) {
    }

    public static function createFromArray(array $data): ApiTypeWrapper
    {
        return new self(
            $data['name'],
        );
    }
}
