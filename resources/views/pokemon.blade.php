@props(['title', 'pokemon'])

<div class="mx-2 my-1">
    <x-header title={{$title}} />
    <div class="mt-1">
        <div>
			<span class="text-indigo-600 capitalize">name:</span> {{ ucfirst($pokemon['name']) }}
		</div>
        <div>
			<span class="text-indigo-600 uppercase">ID:</span> {{ $pokemon['id'] }}
		</div>
        <div>
			<span class="text-indigo-600 capitalize">{{ count($pokemon['types']) <= 1 ? 'type' : 'types' }}:</span> 
			<span> </span>
			@foreach ($pokemon['types'] as $type)
				@php
					$typeName = $type['type']['name'];
				@endphp
				<span>{{ $typeName }}</span>@unless($loop->last),@endunless
			@endforeach
		</div>
		<div>
			<span class="text-indigo-600 capitalize">weight:</span> {{ $pokemon['weight'] }}m
		</div>
		<div>
			<span class="text-indigo-600 capitalize">height:</span> {{ $pokemon['height'] }}kg
		</div>
    </div>
</div>
