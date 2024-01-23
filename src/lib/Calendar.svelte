<script>
    export let firstDay = "Sun";
    export let month = "01"; // Month is a two-digit string
    export let serviceDates = []; // Days of the month that are service dates

    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const daysInMonth = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    const monthIndex = parseInt(month, 10) - 1; // Convert month string to zero-based index
    const monthName = monthNames[monthIndex]; // Get the name of the month
    const days = Array.from({ length: daysInMonth[monthIndex] }, (_, i) => i + 1);
    const startPosition = weekdays.indexOf(firstDay);

    const isServiceDate = (day) => serviceDates.includes(day.toString());
</script>

<div>
    <h2>{monthName}</h2>
    <div class="calendar">
        {#each weekdays as weekday}
            <div class="weekday">{weekday}</div>
        {/each}

        {#each Array(startPosition).fill() as _}
            <div class="day empty"></div>
        {/each}

        {#each days as day}
            <div class="day {isServiceDate(day) ? 'highlighted' : ''}">{day}</div>
        {/each}

        <!-- Additional empty cells to ensure consistent number of rows -->
        {#each Array(42 - days.length - startPosition).fill() as _}
            <div class="day empty"></div>
        {/each}
    </div>
</div>


<style>
    .calendar {
        max-width: 360px; /* Compact layout */
        margin: 20px auto;
        display: grid;
        grid-template-columns: repeat(7, 1fr); /* 7 columns for days of the week */
        grid-auto-rows: 1fr; /* Square boxes for days */
        gap: 4px; /* Spacing between days */
        padding: 10px;
        border-radius: 8px;
    }

    .weekday, .day {
        position: relative; /* Needed for absolute positioning of ::before */
        display: flex;
        align-items: center;
        justify-content: center;
        color: #555;
        font-weight: bold;
        font-size: 0.75rem; /* Smaller font size for a compact layout */
    }

    .weekday {
        font-size: 0.85rem;
    }

    .day.empty {
        background-color: transparent;
    }

    .day.highlighted {
        color: white;
    }

    .day.highlighted::before {
        content: '';
        background-color: #82b482; /* Highlight color */
        border-radius: 50%; /* Perfect circle */
        position: absolute;
        width: 20px; /* Relative to parent */
        height: 20px;
        z-index: -1;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%); /* Center the circle */
       
    }

    h2 {
        text-align: center;
        font-size: 1.2rem; /* Larger font size for the month name */
        margin: 0 0 10px 0; /* Adjusted margin */
        padding: 5px;
        border-radius: 4px;
    }
</style>