@props([
    'attributeName',
    'attributeValue',
    'textColor' => null,
    'textStyle' => 'capitalize',
    'typeColors' => [],
    'types' => null,
    'unit' => ''
])

@php
    $classes = trim("$textStyle " . ($textColor ? "text-$textColor" : ''));
@endphp

<div>
    @if ($types)
        {{-- separate spans are needed to have capitalize on the key and uppercase on the value(s)
                they cannot be nested and so must be separated with an empty span for the space in between --}}

        <span {{ $attributes->merge(['class' => $classes]) }}>
            {{ $attributeName }}:<span> </span>
        </span>

        @foreach ($types as $type)
            <span class="uppercase text-{{ $typeColors[$type->name] }}">
                        {{ $type->name }}
                {{-- @formatter:off --}}
                    </span>@unless ($loop->last),@endunless
            {{-- @formatter:on --}}
        @endforeach
    @else
        <span {{ $attributes->merge(['class' => $classes]) }}>
            {{ $attributeName }}:
        </span>

        {{ ucfirst($attributeValue) . $unit}}
    @endif
</div>
