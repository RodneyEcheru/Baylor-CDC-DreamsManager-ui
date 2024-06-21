<script>
    import {
        apiUrl,
        submitGetForm,
        form_response_state,
        form_response,
        form_is_submitting,
        colors,
    } from "../../modules/data.js";
    import SpinnerFetchingData from "../../ui/SpinnerFetchingData.svelte";
    import { fly, slide } from "svelte/transition";
    import { quintOut } from "svelte/easing";
    import Alert from "../../form/Alert.svelte";

    export let agentID;

    // Define the base URL
    let baseUrl = `${apiUrl}agents/change-role/${agentID}`;

    // Function to handle the link clicks
    const handleLinkClick = async event => {
        event.preventDefault(); // Prevent the default link navigation

        const action = event.target.textContent.trim(); // Get the text content of the clicked link

        // Determine the URL based on the action
        let url;
        switch(action) {
            case 'Activate Account':
                url = `${baseUrl}/activate`;
                break;
            case 'Suspend Account':
                url = `${baseUrl}/suspend`;
                break;
            case 'Transfer Rights':
                url = `${baseUrl}/transfer`;
                break;
            case 'Deactivate Account':
                url = `${baseUrl}/deactivate`;
                break;
            default:
                console.error('Unknown action:', action);
                return;
        }

        //alert('url: ' + url);

        // Make the API request
        await submitGetForm(url)
        /*const response = await fetchData(url);
        console.log(response);*/

        // Refresh the page after receiving the response
        //location.reload();
    };
</script>

{#if $form_is_submitting}
    <SpinnerFetchingData text="Modifying Account" />
{:else}

    {#if $form_response_state}
        <div
                transition:slide={{
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
    {:else}
        <div class="popper-box rounded-md border border-slate-150 bg-white py-1.5 font-inter dark:border-navy-500 dark:bg-navy-700">
            <ul>
                <li>
                    <a href="#" on:click={handleLinkClick} class="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100">Activate Account</a>
                </li>
                <li>
                    <a href="#" on:click={handleLinkClick} class="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100">Suspend Account</a>
                </li>
                <li>
                    <a href="#" on:click={handleLinkClick} class="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100">Transfer Rights</a>
                </li>
            </ul>
            <div class="my-1 h-px bg-slate-150 dark:bg-navy-500"></div>
            <ul>
                <li>
                    <a href="#" on:click={handleLinkClick} class="flex h-8 items-center px-3 pr-8 font-medium tracking-wide outline-none transition-all hover:bg-slate-100 hover:text-slate-800 focus:bg-slate-100 focus:text-slate-800 dark:hover:bg-navy-600 dark:hover:text-navy-100 dark:focus:bg-navy-600 dark:focus:text-navy-100">Deactivate Account</a>
                </li>
            </ul>
        </div>
    {/if}
{/if}
