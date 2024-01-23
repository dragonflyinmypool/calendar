<script>
      import Calendar from '$lib/Calendar.svelte';
      import DayList from '$lib/DayList.svelte';

    /** @type {import('./$types').PageData} */
    export let data;

    // This input will now come from the data object
    let startDate = data.startDate || "2024-01-03"; // Fallback to a default date
    let frequencyInWeeks = data.weekInterval || 2; // Fallback to a default frequency
    let customerName = data.customerName || "Fallback";

    // this is constant
    const currentYear = "2024"

    // General calendar info
    const monthNames = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    const firstDaysOfMonth = ["Mon", "Thu", "Fri", "Mon", "Wed", "Sat", "Mon", "Thu", "Sun", "Tue", "Fri", "Sun"];


    // Based on the input from the backend, lets calculate all the service dates
    function calculateServiceDates(startDate, frequencyInWeeks) {
    const serviceDates = [];
    let currentDate = new Date(startDate + 'T00:00:00Z');


    while (currentDate.getUTCFullYear() === 2024) { // Assuming you're working with year 2024
        serviceDates.push(currentDate.toISOString().split('T')[0]); // YYYY-MM-DD format
        currentDate = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate() + 7 * frequencyInWeeks));
    }

    return serviceDates;
}



    const allServiceDates = calculateServiceDates(startDate, frequencyInWeeks);



    // This function will help filter the service dates for a give month and put the service date in the correct format, without the leading 0
    function getServiceDatesForMonth(month) {
    // Ensure month is two digits
    const formattedMonth = month.padStart(2, '0');
   

    const filteredDates = allServiceDates
        .filter(date => {
            const isMatch = date.startsWith(`${currentYear}-${formattedMonth}`);
          
            return isMatch;
        });

    return filteredDates.map(date => {
        const day = date.split('-')[2];
        return parseInt(day, 10).toString(); // Convert to number to remove leading zero
    });
}


</script>
<div class="page">
  <img class="logo" src="/logo.png" alt="My Logo" />

<div class="header">
  <h1>{customerName}</h1>
  Every {frequencyInWeeks} week{#if frequencyInWeeks>1}s
    
  {/if}
</div>

<main>
    <div class="calendars">
        {#each monthNames as month, index}
            <Calendar firstDay={firstDaysOfMonth[index]} month={month} serviceDates={getServiceDatesForMonth(month)} />
        {/each}
    </div>

    <DayList dates={allServiceDates} />

</main>
</div>
<style>
  .page {
    margin-top: 20px;
  }

  .logo {
    margin: 10px;
  }

  main {
    display: grid;
    grid-template-columns: minmax(1fr, 1200px) 300px; /* Adjust the width as needed */
    grid-template-areas: "calendars daylist";
    gap: 1rem;
  }

  .calendars {
    grid-area: calendars;
    display: grid;
    grid-template-columns: repeat(4, 1fr); /* Set to 4 columns */
    gap: 1rem;
    padding: 1rem;
    max-width: 1200px;
  }

 

  @media (max-width: 800px) {
      main {
        grid-template-columns: 1fr;
        grid-template-areas: 
          "calendars"
          "daylist";
      }

      .calendars {
        grid-template-columns: 1fr; /* Single column layout on smaller screens */
      }
  }
</style>
