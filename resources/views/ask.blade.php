@props(['question', 'styles'])

@php
    $mainBgColor = $styles['mainBgColor'];
@endphp

<div>
    <span class="mt-1 ml-2 mr-1 bg-{{ $mainBgColor }}">
        {{ $question }}
    </span>

    <span class="mt-1 ml-2 mr-1">
        >
    </span>
</div>
