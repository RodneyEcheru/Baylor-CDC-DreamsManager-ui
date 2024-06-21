<script>
    import { colors } from "../modules/data.js";
    // form input data
    export let data
</script>

<select
        required={data.required ?? null}
        multiple={data.multiple ?? null}
        class={`form-select mt-1.5 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:bg-navy-700 dark:hover:border-navy-400 dark:focus:border-accent`}
        data-choices data-choices-removeItem
        id="choices-single-default"
        name="{data.name}" >
    <option value="">{data.placeholder}</option>
    {#each data.options as option}
        <option value="{option.value}" selected="{option.selected ? 'selected' : ''}">{option.text}</option>
    {/each}
</select>
