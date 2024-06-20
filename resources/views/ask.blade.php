@props(['question', 'styles'])

@php
    $mainColor = $styles['mainColor'];
@endphp

<div>
    <span class="mt-1 ml-2 mr-1 bg-{{ $mainColor }}">
        {{ $question }}
    </span>

    <span class="mt-1 ml-2 mr-1">
        >
    </span>
</div>
