import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ url }) {
    // Extracting query parameters
    const weekInterval = url.searchParams.get('week-interval');
    const startDate = url.searchParams.get('start-date');
    const customerName = url.searchParams.get('customer-name');

    console.log(customerName)


    // Validating the received parameters
    if (!weekInterval || !startDate  ) {
        error(400, 'Missing week-interval or start-date parameters or customer name');
    }
    

    // Assuming weekInterval should be a whole number
    const weekIntervalNumber = parseInt(weekInterval, 10);
    if (isNaN(weekIntervalNumber)) {
        error(400, 'week-interval must be a whole number');
    }

    // Returning the extracted and validated parameters
    return {
        weekInterval: weekIntervalNumber,
        startDate,
        customerName
    };
}
