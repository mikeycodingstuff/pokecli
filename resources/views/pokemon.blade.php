@props(['title', 'pokemon', 'twOverrides'])

<x-layout :textColor="$twOverrides['textColor']" :bgColor="$twOverrides['bgColor']">
    <div class="mx-2 my-1 mt-2">
        <x-header
            :title="$title"
            :primaryColor="$twOverrides['primaryColor']"
        />
        <div class="mt-1">
            <x-attribute
                attributeName="name"
                :attributeValue="$pokemon->name"
                textStyle="capitalize"
            />
            <x-attribute
                attributeName="id"
                :attributeValue="$pokemon->id"
                textStyle="uppercase"
            />
            <x-attribute
                attributeName="{{ count($pokemon->types) <= 1 ? 'type' : 'types' }}"
                :typeColors="$twOverrides['typeColors']"
                :types="$pokemon->types"
                textStyle="capitalize"
            />
            <x-attribute
                attributeName="weight"
                :attributeValue="$pokemon->weight"
                textStyle="capitalize"
                unit="kg"
            />
            <x-attribute
                attributeName="height"
                :attributeValue="$pokemon->height"
                textStyle="capitalize"
                unit="m"
            />
        </div>
    </div>
</x-layout>
