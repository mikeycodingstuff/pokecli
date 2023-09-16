@props(['title', 'pokemon', 'styles'])

<div class="mx-2 my-1">
    <x-header :title="$title" :color="$styles['mainColor']" />
    <div class="mt-1">
        <div>
            <span class="text-{{ $styles['mainColor'] }} capitalize">name:</span> {{ ucfirst($pokemon['name']) }}
        </div>
        <div>
            <span class="text-{{ $styles['mainColor'] }} uppercase">ID:</span> {{ $pokemon['id'] }}
        </div>
        <div>
            <span class="text-{{ $styles['mainColor'] }} capitalize">
				{{ count($pokemon['types']) <= 1 ? 'type' : 'types' }}:
			</span>
            <span> </span>
            @foreach ($pokemon['types'] as $type)
                @php
                    $typeName = $type['type']['name'];
                @endphp
                <span class="text-{{ $styles['typeColors'][$typeName] }}">{{ $typeName }}</span>@unless ($loop->last),@endunless
            @endforeach
        </div>
        <div>
            <span class="text-{{ $styles['mainColor'] }}">weight:</span> {{ $pokemon['weight'] }}m
        </div>
        <div>
            <span class="text-{{ $styles['mainColor'] }}">height:</span> {{ $pokemon['height'] }}kg
        </div>
    </div>
</div>
