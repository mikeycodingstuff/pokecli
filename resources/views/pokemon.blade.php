@props(['styles', 'data'])

<div class="m-1">
    <x-header :bgColor="$styles['bgColor']" title="Pokémon"></x-header>
    <div>
        <b>id:</b> {{ $data['id'] }}
    </div>
    <div>
        <b>name:</b> {{ $data['name'] }}
    </div>
    <div>
        <div>types:</div>
        @foreach ($data['types'] as $type)
            <div>slot: {{ $type['slot'] }}</div>
            <div>{{ $type['type']['name'] }}</div>
        @endforeach
    </div>
</div>
<div>test</div>
