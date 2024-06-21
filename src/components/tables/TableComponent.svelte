<script>
    import { apiUrl, fetchData } from "../modules/data.js";
    import SpinnerFetchingData from "../ui/SpinnerFetchingData.svelte";

    export let endpoint;
    export let metadata;
    export let button;

    let fetched_data = false;
    let page = false;

    // Initial URL to fetch data
    const initialUrl = `${apiUrl}${endpoint}`;

    // Fetch initial data
    fetchData(initialUrl)
        .then(data => {
            console.log('Initial page data:', data);
            fetched_data = true;

            // Format data into an object that fits the structure of the datatable page
            page = {
                metadata,
                button,
                datatable: data.server_data
            }
        })
        .catch(error => console.error('Error in fetching initial data:', error));

    // Handle button clicks
    function handleButtonClick(event) {
        const href = event.target.getAttribute('data-href');
        if (href && href !== '#!') {
            const [, pageData] = href.match(/\/report\/(.+)/);
            const url = `${apiUrl}${endpoint.split('/').slice(0, -2).join('/')}/${pageData}`;
            //alert(`Fetching data for: ${url}`);

            // Fetch data for the new page
            fetchData(url)
                .then(data => {
                    console.log('Page data:', data);
                    fetched_data = true;

                    // Format data into an object that fits the structure of the datatable page
                    page = {
                        metadata,
                        button,
                        datatable: data.server_data
                    }
                })
                .catch(error => console.error('Error in fetching data:', error));
        }
    }
</script>


{#if !fetched_data}
    <SpinnerFetchingData text="Fetching categories" />
{:else}
    <div class="grid grid-cols-1 gap-4 sm:gap-5 lg:gap-6">
        <!-- GridJS Advanced Example -->
        <div class="card pb-4">
            <div class="my-3 flex h-8 items-center justify-between px-4 sm:px-5">
                <h2 class="font-medium tracking-wide text-slate-700 line-clamp-1 dark:text-navy-100 lg:text-base">
                    {page.metadata.title}
                </h2>
            </div>
            <div>
                <div x-data="pages.tables.initGridTableExapmle">
                    <div role="complementary" class="gridjs gridjs-container" style="width: 100%;">
                        <div class="gridjs-head">
                            <div class="gridjs-search">
                                <input type="search" placeholder="Type a keyword..." aria-label="Type a keyword..." class="gridjs-input gridjs-search-input" value="">
                            </div>
                        </div>
                        <div class="gridjs-wrapper" style="height: auto;">
                            <table role="grid" class="gridjs-table" style="height: auto;">
                                <thead class="gridjs-thead">
                                <tr class="gridjs-tr">
                                    {#each page.datatable.columns as column}
                                        <th data-column-id="id" class="gridjs-th gridjs-th-sort" tabindex="0"
                                            style="min-width: 61px; width: 72px;">
                                            <div class="gridjs-th-content">{column}</div>
                                        </th>
                                    {/each}
                                </tr>
                                </thead>
                                <tbody class="gridjs-tbody">
                                {#each page.datatable.values as column_values}
                                    <tr class="gridjs-tr">
                                        {#each column_values as value}
                                            <td class="gridjs-td">
                                                <span><span class="text-slate-700 dark:text-navy-100 font-medium">{@html value}</span></span>
                                            </td>
                                        {/each}
                                    </tr>
                                {/each}
                                </tbody>
                            </table>
                        </div>

                        {#if page.datatable.pagination_details}
                            <div class="gridjs-footer">
                                <div class="gridjs-pagination">
                                    <div role="status" aria-live="polite" class="gridjs-summary"
                                         title="Page 2 of 2">{page.datatable.pagination_details.showing_entries}
                                    </div>
                                    <div class="gridjs-pages">
                                        <button on:click={handleButtonClick} data-href={page.datatable.pagination_details.first_page_link} tabindex="0" role="button" title="First Page"
                                                aria-label="First Page" class="">First Page
                                        </button>
                                        <button on:click={handleButtonClick} data-href={page.datatable.pagination_details.previous_page_link} tabindex="0" role="button" title="Previous"
                                                aria-label="Previous" class="">Previous
                                        </button>
                                        {#if page.datatable.pagination_details.pagination_links.length > 0}
                                            {#each page.datatable.pagination_details.pagination_links as link}
                                                <button on:click={handleButtonClick} data-href={link.url} tabindex="0" role="button" class={link.active_status} title="{link.text}"
                                                        aria-label="{link.text}">{link.text}
                                                </button>
                                            {/each}
                                        {/if}
                                        <button on:click={handleButtonClick} data-href={page.datatable.pagination_details.next_page_link} tabindex="0" role="button" title="Next" aria-label="Next"
                                                class="">Next
                                        </button>
                                        <button on:click={handleButtonClick} data-href={page.datatable.pagination_details.last_page_link} tabindex="0" role="button" title="Last" aria-label="Last"
                                                class="">Last
                                        </button>
                                    </div>
                                </div>
                            </div>

                        {/if}

                    </div>
                </div>
            </div>
        </div>
    </div>
{/if}
