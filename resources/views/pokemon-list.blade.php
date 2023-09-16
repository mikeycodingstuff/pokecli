@props(['title', 'pokemons', 'styles'])

@php
    use function Termwind\terminal;
    
    $mainColor = $styles['mainColor'];
    $terminalWidth = terminal()->width();
    
    $numColumns = floor($terminalWidth / 20);
@endphp

<div class="mx-2 my-1">
    <x-header
        :title="$title"
        :color="$mainColor"
    />
    <div class="mt-1 flex flex-wrap">
        @foreach ($pokemons as $pokemon)
            <span class="capitalize w-1/15">{{ $pokemon['id'] }}.{{ $pokemon['name'] }}</span>
        @endforeach
    </div>
</div>
