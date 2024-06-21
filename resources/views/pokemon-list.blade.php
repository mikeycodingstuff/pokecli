@props(['title', 'pokemons', 'styles'])

@php
    use function Termwind\terminal;

    $primaryColor = $styles['primaryColor'];
    $terminalWidth = terminal()->width();

    $numColumns = floor($terminalWidth / 20);
@endphp

<x-layout>
    <div class="mx-2 my-1">
        <x-header
            :title="$title"
            :color="$primaryColor"
        />
        <div class="mt-1">
            @foreach ($pokemons as $pokemon)
                <div class="capitalize ">{{ $pokemon['id'] }}.{{ $pokemon['name'] }}</div>
            @endforeach
        </div>
    </div>
</x-layout>
