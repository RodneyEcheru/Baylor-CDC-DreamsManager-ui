<script>
    // form input data
    import {colors} from "../modules/data.js";

    export let data
</script>

<textarea
        readonly={data.readonly || null}
        autocomplete={data.autocomplete || null}
        required={data.required || null}
        type="text"
        class={`focus:text-green-800 border border-green-800 ${colors.dark_font} ${colors.light_background} text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5`}
        placeholder="{data.placeholder}"
        name="{data.name}"
        rows="14"
>
    {data.value}
</textarea>
