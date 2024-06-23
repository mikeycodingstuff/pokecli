@props(['textColor', 'bgColor'])

<html>
    <head>
		<meta charset="UTF-8">
        <title></title>
    </head>

    <div class="text-{{$textColor}} bg-{{$bgColor}} mb-1">
	    {{ $slot }}
    </div>
</html>
