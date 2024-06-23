@props(['title', 'pokemons', 'twOverrides'])

@php
    use function Termwind\terminal;

    $terminalWidth = terminal()->width();

    $numColumns = floor($terminalWidth / 20);
@endphp

<x-layout :textColor="$twOverrides['textColor']" :bgColor="$twOverrides['bgColor']">
    <div class="mx-2 my-1">
        <x-header
            :title="$title"
            :primaryColor="$twOverrides['primaryColor']"
        />
        <div class="mt-1">
            @foreach ($pokemons as $pokemon)
                <div class="capitalize ">{{ $pokemon['id'] }}.{{ $pokemon['name'] }}</div>
            @endforeach
        </div>
    </div>
</x-layout>
