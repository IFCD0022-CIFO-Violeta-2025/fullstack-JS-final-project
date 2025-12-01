//ESTE CONTROLADOR OBTIENE EVENTOS ACOTADOS POR FECHAS Y GENERA CALENDARIOS EN FORMATO iCalendar (.ICS)
//https://dev.to/jondotsoy/leer-archivos-ics-en-javascript-con-icalendarjs-4fg0

//https://www.npmjs.com/package/icalendar.js

//$ npm add icalendar.js

import { ICalendar } from 'icalendar.js';

export async function readCalendar(url)
{
    //const location = new URL("sample.ics", import.meta.url);
    //const payload = await readFile(location);

    const location = url //del fichero compatible ICS
    const icalendar = ICalendar.from(location);

    return icalendar
}