import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export function load({ url }) {
    // Extracting query parameters
    const weekInterval = url.searchParams.get('week-interval');
    const startDate = url.searchParams.get('start-date');

    // Validating the received parameters
    if (!weekInterval || !startDate) {
        error(400, 'Missing week-interval or start-date parameters');
    }

    // Assuming weekInterval should be a whole number
    const weekIntervalNumber = parseInt(weekInterval, 10);
    if (isNaN(weekIntervalNumber)) {
        error(400, 'week-interval must be a whole number');
    }

    // Returning the extracted and validated parameters
    return {
        weekInterval: weekIntervalNumber,
        startDate
    };
}
