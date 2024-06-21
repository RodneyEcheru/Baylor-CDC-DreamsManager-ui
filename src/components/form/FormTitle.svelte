<script>
    import { colors} from '../modules/data.js'
    export let title
    export let subtitle
</script>

<div class={`${colors.dark_font} font-light text-xl`}>{title}</div>
<div class={`${colors.dark_font} text-xl antialiased`}>{subtitle}</div>

<button type="button" onclick="history.back()" class={`flex flex-row ${colors.light_font} hover:text-green-800 hover:${colors.light_background} ${colors.dark_background} hover:border hover:border-green-800 transition shadow-md hover:shadow-2xl hover:scale-110 py-3 px-5 sm:ms-4 text-sm font-medium focus:outline-none rounded-full border-green-200 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:border-gray-600`}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="19" y1="12" x2="5" y2="12"></line>
        <polyline points="12 19 5 12 12 5"></polyline>
    </svg>
    Go Back
</button>