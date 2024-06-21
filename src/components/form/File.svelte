<script>
    import { colors } from "../modules/data.js";
    // form input data
    export let data
</script>

<!-- Default File Input Example -->
<!--<input class="form-control" type="file" id="formFile" name="academic_document">-->

<input
        readonly={data.readonly || null}
        autocomplete={data.autocomplete || null}
        required={data.required || null}
        type="file"
        class={`border border-green-800 ${colors.dark_font} ${colors.light_background} text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5`}
        placeholder="{data.placeholder}"
        name="{data.name}"
        value="{data.value}"
>