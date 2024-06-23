<?php

declare(strict_types=1);

namespace App\Helpers;

class ApiPokemonWrapper
{
    public function __construct(
        public string $name,
        public int $id,
        public ?array $types,
        public ?float $weight,
        public ?float $height,
    ) {
    }

    public static function createFromArray(array $data): ApiPokemonWrapper
    {
        if (isset($data['types'])) {
            $types = array_map(function ($type) {
                return ApiTypeWrapper::createFromArray($type['type']);
            }, $data['types']);
        } else {
            $types = null;
        }

        return new self(
            name: $data['name'],
            id: $data['id'],
            types: $types,
            weight: isset($data['weight']) ? NumberHelper::decimetreToMetre($data['weight']) : null,
            height: isset($data['height']) ? NumberHelper::hectogramToKilogram($data['height']) : null,
        );
    }
}
