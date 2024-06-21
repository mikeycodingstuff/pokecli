<?php

declare(strict_types=1);

namespace App\Helpers;

class ApiPokemonWrapper
{
    public function __construct(
        public string $name,
        public int $id,
        public array $types,
        public float $weight,
        public float $height,
    ) {
    }

    public static function createFromArray(array $data): ApiPokemonWrapper
    {
        $types = array_map(function ($type) {
            return ApiTypeWrapper::createFromArray($type['type']);
        }, $data['types']);

        return new self(
            $data['name'],
            $data['id'],
            $types,
            NumberHelper::decimetreToMetre($data['weight']),
            NumberHelper::hectogramToKilogram($data['height'])
        );
    }
}
