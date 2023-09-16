@props(['title', 'pokemon', 'styles'])

@php
    $mainColor = $styles['mainColor'];
@endphp

<div class="mx-2 my-1">
    <x-header
        :title="$title"
        :color="$mainColor"
    />
    <div class="mt-1">
        <x-attribute
            attributeName="name"
            :attributeValue="ucfirst($pokemon['name'])"
            :textColor="$mainColor"
            textStyle="capitalize"
        />
        <x-attribute
            attributeName="id"
            :attributeValue="ucfirst($pokemon['id'])"
            :textColor="$mainColor"
            textStyle="uppercase"
        />
        <div>
            <span class="text-{{ $mainColor }} capitalize">
                {{ count($pokemon['types']) <= 1 ? 'type' : 'types' }}:
            </span>
            <span> </span>
            @foreach ($pokemon['types'] as $type)
                @php
                    $typeName = $type['type']['name'];
                @endphp
                {{-- blade-formatter-disable --}}
                <span class="text-{{ $styles['typeColors'][$typeName] }} uppercase">{{ $typeName }}</span>@unless ($loop->last),@endunless
                {{-- blade-formatter-enable --}}
            @endforeach
        </div>
        <x-attribute
            attributeName="weight"
            :attributeValue="ucfirst($pokemon['weight'])"
            :textColor="$mainColor"
            textStyle="capitalize"
            unit="kg"
        />
        <x-attribute
            attributeName="height"
            :attributeValue="ucfirst($pokemon['height'])"
            :textColor="$mainColor"
            textStyle="capitalize"
            unit=m
        />
    </div>
</div>
