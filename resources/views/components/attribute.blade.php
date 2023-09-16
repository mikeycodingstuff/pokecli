@props(['attributeName', 'attributeValue', 'textColor', 'textStyle', 'unit'])

<div>
    <span class="text-{{ $textColor }} {{ $textStyle }}">
        {{ $attributeName }}:
    </span>
    {{ $attributeValue . ($unit ?? '') }}
</div>
