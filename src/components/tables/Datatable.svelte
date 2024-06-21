<script>
    import { colors } from '../modules/data.js'
    import { fly, slide, draw, fade, blur, scale, crossfade  } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';

    export let data, page

    const pagination_details = data.pagination_details
</script>

{#if data.cards}
    <div class="flex justify-content-center">
        {#each data.cards as card}

            <div class="mb-4 bg-green-200 border border-green-200 rounded-lg shadow dark:bg-green-800 dark:border-green-700">
                <div class="flex flex-col p-5">
                    <h5 class="mb-1 text-lg font-semibold text-green-800 dark:text-white">{card.title}</h5>
                    <span class="text-2xl font-bold text-green-500 dark:text-green-800">{card.content}</span>
                </div>
            </div>

        {/each}
    </div>
{/if}

<section class={`${colors.dark_body_background} p-5 rounded-lg w-full mx-auto mb-4`}>
    <div class="flex justify-between">
        <div>
            <h1 class={`mb-4 text-2xl font-medium tracking-tight leading-none ${colors.light_font}`}>{data.title}</h1>
            <p class={`text-lg font-normal lg:text-xl ${colors.light_font}`}>{data.sub_title}</p>
        </div>
        <div>
            {#if page.button.url != '#'}
                <a href={page.button.url} class={`flex flex-row ${colors.dark_font} hover:text-green-950 hover:bg-green-100 ${colors.light_background} hover:border hover:border-green-800 transition shadow-md hover:shadow-2xl hover:scale-110 py-3 px-5 sm:ms-4 text-sm font-medium focus:outline-none rounded-full border-green-200 focus:z-10 focus:ring-4 focus:ring-green-100 dark:focus:ring-green-700 dark:border-green-600`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                        <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor" />
                    </svg>
                    {page.button.text}
                </a>
            {/if}
        </div>
    </div>
</section>


<div class="col-md-12">
    {#if data}

        <div class="my-4 relative overflow-x-auto shadow-md sm:rounded-lg">
            <table class="w-full text-sm text-left rtl:text-right text-green-800">
                <thead class="text-xs text-green-900 uppercase bg-green-50 dark:bg-green-700 dark:text-green-400">
                <tr>
                    {#each data.columns as column}
                        <th scope="col" class="px-6 py-3">{column}</th>
                    {/each}
                </tr>
                </thead>
                <tbody>
                {#each data.values as column_values}
                    <tr class="hover:bg-green-200 odd:bg-green-100 odd:dark:bg-green-900 even:bg-green-50 even:dark:bg-green-800 border-b dark:border-green-700">
                        {#each column_values as value}
                            <td class="px-6 py-4">{@html value}</td>
                        {/each}
                    </tr>
                {/each}
                </tbody>
            </table>
        </div>

        {#if pagination_details}
            <div class="text-green-800 mb-2">
                {pagination_details.showing_entries}
            </div>
            <nav aria-label="Page navigation example">
                <ul class="inline-flex -space-x-px text-sm">
                    <li>
                        <a href={pagination_details.first_page_link} class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-green-500 bg-white border border-e-0 border-green-300 rounded-s-lg hover:bg-green-100 hover:text-green-700 dark:bg-green-800 dark:border-green-700 dark:text-green-400 dark:hover:bg-green-700 dark:hover:text-white">First</a>
                    </li>
                    <li>
                        <a href={pagination_details.previous_page_link} class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-green-500 bg-white border border-e-0 border-green-300 hover:bg-green-100 hover:text-green-700 dark:bg-green-800 dark:border-green-700 dark:text-green-400 dark:hover:bg-green-700 dark:hover:text-white">Previous</a>
                    </li>
                    {#if pagination_details.pagination_links.length > 0}
                        {#each pagination_details.pagination_links as link}
                            <li class="{link.active_status}">
                                <a href="{link.url}" class="flex items-center justify-center px-3 h-8 leading-tight text-green-500 bg-white border border-green-300 hover:bg-green-100 hover:text-green-700 dark:bg-green-800 dark:border-green-700 dark:text-green-400 dark:hover:bg-green-700 dark:hover:text-white">{link.text}</a>
                            </li>
                        {/each}
                    {/if}
                    <li>
                        <a href={pagination_details.next_page_link} class="flex items-center justify-center px-3 h-8 leading-tight text-green-500 bg-white border border-green-300 hover:bg-green-100 hover:text-green-700 dark:bg-green-800 dark:border-green-700 dark:text-green-400 dark:hover:bg-green-700 dark:hover:text-white">Next</a>
                    </li>
                    <li>
                        <a href={pagination_details.last_page_link} class="flex items-center justify-center px-3 h-8 leading-tight text-green-500 bg-white border border-green-300 rounded-e-lg hover:bg-green-100 hover:text-green-700 dark:bg-green-800 dark:border-green-700 dark:text-green-400 dark:hover:bg-green-700 dark:hover:text-white">Last</a>
                    </li>
                </ul>
            </nav>
        {/if}

    {/if}
</div>