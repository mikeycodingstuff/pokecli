@props(['question', 'textColor', 'bgColor'])

<div class="mt-1 ml-2 mr-1">
    <span class="text-{{ $textColor }} bg-{{ $primaryColor }} px-1">
        {{ $question }}
    </span>

    <span class="mt-2">
        >
    </span>
</div>
