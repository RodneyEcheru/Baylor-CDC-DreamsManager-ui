<script>

    export let data
</script>

<input
        readonly={data.readonly || null}
        autocomplete={data.autocomplete || null}
        required={data.required || null}
        type="{data.type}"
        class="form-input w-full rounded-lg bg-slate-150 px-3 py-2 ring-primary/50 placeholder:text-slate-400 hover:bg-slate-200 focus:ring dark:bg-navy-900/90 dark:ring-accent/50 dark:placeholder:text-navy-300 dark:hover:bg-navy-900 dark:focus:bg-navy-900"
        placeholder="{data.placeholder}"
        name="{data.name}"
        value="{data.value}"
>