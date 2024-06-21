
<script>
    import { fetchData, apiUrl } from "../../modules/data.js";
    import SpinnerFetchingData from "../../ui/SpinnerFetchingData.svelte";

    export let api_data_endpoint, page_link, color, text

    let fetched_data = false
    let categories_count = 0
    let items_label = ""

    fetchData(api_data_endpoint).then(data => {
        items_label = Number(data) > 1 ? "items" : "item"
        categories_count = data.toLocaleString()
        fetched_data = true
    })
</script>


<a href={page_link} class={`card swiper-slide w-56 shrink-0 p-3 pt-4 transition transition-all transform hover:scale-110 hover:bg-${color} text-base text-${color} hover:text-white`}>
    <div class="flex items-center justify-between">
        <img class="w-14" src={`/images/folders/folder-${color}.svg`} alt="folder">
        <button class="btn -mr-2 size-8 rounded-full p-0 hover:bg-slate-300/20 focus:bg-slate-300/20 active:bg-slate-300/25 dark:hover:bg-navy-300/20 dark:focus:bg-navy-300/20 dark:active:bg-navy-300/25">
            <svg xmlns="http://www.w3.org/2000/svg" class="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path>
            </svg>
        </button>
    </div>
    <div class="pt-5 font-medium tracking-wide">
        {text}
    </div>
    <div class="mt-1.5 flex items-center justify-between text-white">
        <p class="text-salte-400 text-xs+ hover:text-white">
            {#if !fetched_data}
                <SpinnerFetchingData text="Fetching count..." />
            {:else}
                {categories_count} {items_label}
            {/if}
        </p>
        <span class={`badge bg-${color} px-2 py-1 rounded transition transition-all transform hover:bg-white`}>Manage</span>
    </div>
</a>
