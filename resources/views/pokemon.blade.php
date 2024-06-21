@props(['title', 'pokemon', 'styles'])

@php
    $primaryColor = $styles['primaryColor'];
    $bgColor = $styles['bgColor'];
    $textColor = $styles['textColor'];
@endphp

<x-layout :textColor="$textColor" :bgColor="$bgColor">
    <div class="mx-2 my-1 mt-2">
        <x-header
            :title="$title"
            :color="$primaryColor"
        />
        <div class="mt-1">
            <x-attribute
                attributeName="name"
                :attributeValue="ucfirst($pokemon->name)"
                :textColor="$primaryColor"
                textStyle="capitalize"
            />
            <x-attribute
                attributeName="id"
                :attributeValue="ucfirst($pokemon->id)"
                :textColor="$primaryColor"
                textStyle="uppercase"
            />
            <div>
                <span class="text-{{ $primaryColor }} capitalize">
                    {{ count($pokemon->types) <= 1 ? 'type' : 'types' }}:
                </span>

                <span> </span>

                @foreach ($pokemon->types as $type)
                    {{-- blade-formatter-disable --}}
                    <span class="uppercase text-{{ $styles['typeColors'][$type->name] }}">
                        {{ $type->name }}
                    </span>@unless ($loop->last),@endunless
                    {{-- blade-formatter-enable --}}
                @endforeach
            </div>
            <x-attribute
                attributeName="weight"
                :attributeValue="ucfirst($pokemon->weight)"
                :textColor="$primaryColor"
                textStyle="capitalize"
                unit="kg"
            />
            <x-attribute
                attributeName="height"
                :attributeValue="ucfirst($pokemon->height)"
                :textColor="$primaryColor"
                textStyle="capitalize"
                unit="m"
            />
        </div>
    </div>
</x-layout>
