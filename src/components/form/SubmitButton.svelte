<script>
  import {
    form_response_state,
    form_response,
    form_is_submitting,
    colors,
  } from "../modules/data.js";
  import SpinnerFetchingData from "../ui/SpinnerFetchingData.svelte";
  import { fly, slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import Alert from "./Alert.svelte";

  export let text;
  let showModal = false;
</script>

{#if $form_is_submitting}
  <SpinnerFetchingData text="Submitting" />
{:else}

  {#if $form_response_state}
    <div
            transition:fly={{
      delay: 0,
      duration: 300,
      x: 100,
      y: 500,
      opacity: 0.5,
      easing: quintOut,
    }}
    >
      <Alert
              status={$form_response.status}
              title={$form_response.title}
              message={$form_response.message}
      />
    </div>
  {/if}

  <button
    type="submit"
    class="mt-10 btn space-x-2 rounded-full bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90"
  >
    <span> {text} </span>
  </button>
{/if}
