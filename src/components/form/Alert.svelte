<script>
    export let title, message, status;

    let styling, bg_styling, border_styling;

    const statusClasses = {
        success: {
            text: 'text-success',
            bg: 'bg-success',
            border: 'border-success',
        },
        warning: {
            text: 'text-warning',
            bg: 'bg-warning',
            border: 'border-warning',
        },
        error: {
            text: 'text-error',
            bg: 'bg-error',
            border: 'border-error',
        },
        info: {
            text: 'text-info',
            bg: 'bg-info',
            border: 'border-info',
        },
    };

    const defaultClasses = statusClasses.error;

    ({ text: styling, bg: bg_styling, border: border_styling } = statusClasses[status] || defaultClasses);
</script>

<div class={`alert flex overflow-hidden rounded-lg border ${border_styling} ${styling} mt-10`}>
    <div class={`${bg_styling} p-3 text-white`}>{title}</div>
    <div class="px-4 py-3 sm:px-5">{@html message}</div>
</div>
