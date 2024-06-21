
<script>
    import { fetchData } from "../../modules/data.js";
    import SpinnerFetchingData from "../../ui/SpinnerFetchingData.svelte";

    export let url;
    export let title;
    export let linkText;
    export let linkUrl;
    export let loadingText;
    export let dataTitleProperty;
    export let dataSubtitleProperty;

    let items = [];
    let items_count = 0;
    let fetched_data = false;

    fetchData(url)
        .then(data => {
            console.log(data);
            items = data;
            fetched_data = true;
        })
        .catch(error => console.error('Error in fetching data:', error));
</script>

<div>
    <div class="flex items-center justify-between">
        <h3 class="text-xl font-medium text-slate-800 dark:text-navy-50">
            {title}
        </h3>
        <a href={linkUrl}
           class="border-b border-dotted border-current pb-0.5 font-medium text-primary outline-none transition-colors duration-300 hover:text-primary/70 focus:text-primary/70 dark:text-accent-light dark:hover:text-accent-light/70 dark:focus:text-accent-light/70">
            {linkText}
        </a>
    </div>
    <div class="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
        {#if !fetched_data}
            <SpinnerFetchingData text={loadingText}/>
        {:else}
            {#each items as item}
                <div class="card shrink-0 p-3 pb-5 transition transition-all transform hover:scale-110 text-slate-600 hover:text-white">
                    <div class="text-base font-medium tracking-wide text-teal-200">
                        {item[dataTitleProperty]}
                    </div>
                    <div class="mt-1.5 flex items-center justify-between">
                        <p class="text-slate-400 text-xs+">
                            {item[dataSubtitleProperty]}
                        </p>
                    </div>
                </div>
            {/each}
        {/if}
    </div>
</div>
