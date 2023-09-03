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
        <b>types:</b>
        @foreach ($data['types'] as $index => $type)
            @php
                $typeName = $type['type']['name'];
                $typeColorClass = $typeColors[$typeName]['replace'];
            @endphp
            <span class="text-{{ $typeColorClass }}">{{ $typeName }}</span>,
        @endforeach
    </div>
</div>
