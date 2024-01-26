"use strict";

async function loadSchedule() {
    try {
        const response = await fetch ("https://dahlgren.miun.se/ramschema_ht23.php");
        const data = response.json();

        console.log(data);
    } catch {}

}