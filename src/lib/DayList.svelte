<script>
    export let dates = [];

    const formatDate = (isoDate) => {
        const [year, month, day] = isoDate.split('-');
        return `${month}/${day}/${year}`; // Switch to month/day/year format
    };
</script>

<div class="center"> 
    <div class="date-list-container">
        <h2 class="list-title">List of Dates</h2>
        <div class="date-list">
            {#each dates as date}
                <div class="date-item">{formatDate(date)}</div>
            {/each}
        </div>
    </div>
</div>

<style>
    .center {
        width: 100%;
        display: flex;
        justify-content: center;
    }
    .date-list-container {
        text-align: center; /* Center content horizontally */
        font-size: 12px ;

      
    }

    .list-title {
        margin-bottom: 10px; /* Space between title and list */
    }

    .date-list {
        display: grid;
        grid-template-columns: 100px 100px 100px;
        border: 1px solid #ddd; /* Left border for grid lines */
        
    }

    .date-item {
        margin: 5px 0;
        padding: 5px 10px;
        border-bottom: 1px solid #ddd; /* Bottom border for grid lines */
        border-right: 1px solid #ddd; /* Bottom border for grid lines */

    }

    .date-item:last-child {
        border-bottom: none; /* Remove bottom border from the last item */
    }
</style>
