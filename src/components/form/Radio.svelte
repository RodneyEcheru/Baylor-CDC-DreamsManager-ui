<script>
    import { colors } from "../modules/data.js";
    // form input data
    export let data
</script>

<div class="flex gap-4">
    {#each data.options as option}
        <label class="inline-flex items-center space-x-2">
            <input
                    required={data.required ?? null}
                    class={`form-radio is-basic size-6 rounded-full border-slate-400/70 checked:border-primary checked:bg-primary hover:border-primary focus:border-primary dark:border-navy-400 dark:checked:border-accent dark:checked:bg-accent dark:hover:border-accent dark:focus:border-accent`}
                    type="radio"
                    name="{data.name}"
                    value="{option.value}"
                    checked="{option.selected ? 'checked' : ''}"
            >
            <label class={`${colors.dark_font}`}>{option.label}</label>
        </label>
    {/each}
</div>
