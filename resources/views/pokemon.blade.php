@props(['styles', 'data', 'typeColors'])

<div class="m-1">
    <div class="mb-1">
        <x-header :bgColor="$styles['bgColor']" title="Pokémon:"></x-header>
    </div>
    <div>
        <b>id:</b> {{ $data['id'] }}
    </div>
    <div>
        <b>name:</b> {{ $data['name'] }}
    </div>
    <div>
        <b>types:</b><span> </span>
        @php
            $formattedTypes = [];
            foreach ($data['types'] as $type) {
                $typeName = $type['type']['name'];
                $typeColorClass = $typeColors[$typeName]['replace'];
                $formattedTypes[] = "<span class='text-$typeColorClass'>$typeName</span>";
            }
            echo implode(', ', $formattedTypes);
        @endphp
    </div>
</div>
