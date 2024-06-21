
<script>
    import FormComponent from "./FormComponent.svelte";

    export let data, width = false
</script>

<!-- <div class={`${colors.light_background} ${width ? width : 'w-2/4'} mx-auto p-4 border rounded-lg shadow sm:p-6 md:p-8 `}> -->
<div class={``}>
    <FormComponent data={data}/>
</div>
