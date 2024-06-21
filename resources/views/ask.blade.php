@props(['question', 'styles'])

<div class="mt-1 ml-1 mr-1">
    <span class="bg-{{ $styles['primaryColor'] }} px-1">
        {{ $question }}
    </span>

    <span class="mt-2">
        >
    </span>
</div>
