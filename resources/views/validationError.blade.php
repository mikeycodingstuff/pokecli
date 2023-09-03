@props(['errors'])

<div class="my-1 mx-2">
    <p class="bg-red-400 m-0 text-white">Validation Error: </p>

    @foreach ($errors->get('query') as $error)
        <p class="m-0">{{ $error }}</p>
    @endforeach
</div>
