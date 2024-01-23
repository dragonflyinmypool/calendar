<script>
    /** @type {import('./$types').PageData} */
    export let data;
</script>

{#if data.weekInterval != null && data.startDate}
    <div>
        <h1>Calendar Details</h1>
        <p>Week Interval: {data.weekInterval}</p>
        <p>Start Date: {data.startDate}</p>
    </div>
{:else}
    <p>Missing calendar details.</p>
{/if}