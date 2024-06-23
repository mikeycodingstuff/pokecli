<?php

declare(strict_types=1);

namespace App\Models;

use App\Helpers\NumberHelper;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Pokemon extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'generation_id',
        'base_experience',
        'height',
        'weight',
    ];

    public function types(): BelongsToMany
    {
        return $this->belongsToMany(Type::class);
    }

    public function generation(): BelongsTo
    {
        return $this->belongsTo(Generation::class);
    }

    protected function weight(): Attribute
    {
        return Attribute::make(
            get: fn (int $value) => NumberHelper::hectogramToKilogram($value),
        );
    }

    protected function height(): Attribute
    {
        return Attribute::make(
            get: fn (int $value) => NumberHelper::decimetreToMetre($value),
        );
    }
}
