<?php

namespace App\Services;

class FormatDataService
{
    public function formatData($data): array
    {
        return [
            'id' => $data['id'],
            'name' => $data['name'],
            'types' => $data['types'],
        ];
    }
}
