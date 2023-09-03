@props(['id', 'name', 'types'])

<div class="m-1">
    <p>{{ $id }}</p>
    <p>{{ $name }}</p>
    @foreach ($types as $type)
        <p>{{ $type['slot'] }}</p>
        <p>{{ $type['type']['name'] }}</p>
    @endforeach
</div>
<div>test</div>
