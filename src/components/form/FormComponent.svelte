<script>
    import { colors, submitMultipartFormData } from "../modules/data.js";
    import SubmitButton from "./SubmitButton.svelte";
    import Input from "./Input.svelte";
    import HiddenInput from "./HiddenInput.svelte";
    import Select from "./Select.svelte";
    import File from "./File.svelte";
    import Radio from "./Radio.svelte";
    import Textarea from "./Textarea.svelte";
    export let data;
    console.log("data");
    console.log(data);
</script>

<div class="p-2">
    <form
        action={data.action}
        class="row"
        enctype="multipart/form-data"
        method="post"
        on:submit|preventDefault={submitMultipartFormData}
    >
        {#each data.inputs as input}
        
            {#if input.input_type === "hidden"}
                <HiddenInput data={input} />
            {:else}

                <div class="mt-4 space-y-4">
                    <label class="block">
                        <span>{input.label}</span>
                        <span class="relative mt-1.5 flex">
                            {#if input.input_type === "input"}
                                <Input data={input} />
                            {:else if input.input_type === "textarea"}
                                <Textarea data={input} />
                            {:else if input.input_type === "select"}
                                <Select data={input} />
                            {:else if input.input_type === "file"}
                                <File data={input} />
                            {:else if input.input_type === "radio"}
                                <Radio data={input} />
                            {/if}
                        </span>
                    </label>
                </div>
                
            {/if}
        {/each}

        <SubmitButton text={data.button_text} />
    </form>
</div>
