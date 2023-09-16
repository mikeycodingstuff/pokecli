@props(['pokemon'])

<div>
    <x-header title="Pokémon Info:" />
    <div class="px-1 pb-1">
        <div>
			<span class="text-indigo-600">Name:</span> {{ $pokemon['name'] }}
		</div>
        <div>
			<span class="text-indigo-600">Id:</span> {{ $pokemon['id'] }}
		</div>
        <div>
			<span class="text-indigo-600">{{ count($pokemon['types']) <= 1 ? 'Type' : 'Types' }}:</span> 
			<span> </span>
			@foreach ($pokemon['types'] as $type)
				@php
					$typeName = $type['type']['name'];
				@endphp
				<span>{{ $typeName }}</span>@unless($loop->last),@endunless
			@endforeach
		</div>
    </div>
</div>
