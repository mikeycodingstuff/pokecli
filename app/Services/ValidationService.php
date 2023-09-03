<?php

declare(strict_types=1);

namespace App\Services;

use Illuminate\Support\Facades\Validator;

class ValidationService
{
    public function validatePokemonQuery($query)
    {
        $rules = [
            'query' => 'required|alpha_num',
        ];

        return Validator::make(['query' => $query], $rules);
    }
}
