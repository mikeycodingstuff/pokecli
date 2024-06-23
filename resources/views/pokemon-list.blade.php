@props(['title', 'pokemons', 'twOverrides'])

<x-layout :textColor="$twOverrides['textColor']" :bgColor="$twOverrides['bgColor']">
    <div class="mx-2 my-1 mt-2">
        <x-header
            :title="$title"
            :primaryColor="$twOverrides['primaryColor']"
        />

        <div class="mt-1">
            @foreach ($pokemons as $pokemon)
                <div class="capitalize ">{{ $pokemon->id }}. {{ $pokemon->name }}</div>
            @endforeach
        </div>
    </div>
</x-layout>
