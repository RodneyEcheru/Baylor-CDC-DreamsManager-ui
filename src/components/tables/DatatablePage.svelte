
<script>
    import { fly, slide, draw, fade, blur, scale, crossfade  } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
    import {onMount} from "svelte";
    import Datatable from "../tables/Datatable.svelte";

    let mounted = false
    onMount(()=> mounted = true)

    export let data
</script>

<Datatable data={data.datatable} page={data} />

