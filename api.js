const SUPABASE_URL = "https://rubjadkltlbenahdutpl.supabase.co";
const SUPABASE_KEY = "sb_publishable_in7AoGhf34taPb-r9Q1heQ_JXE_wNon";

async function getProjectiles() {
    const response = await fetch(
        `${SUPABASE_URL}/rest/v1/projectile_catalog?select=*`,
        {
            headers: {
                "apikey": SUPABASE_KEY,
                "Authorization": `Bearer ${SUPABASE_KEY}`
            }
        }
    );

    if (!response.ok) {
        throw new Error(`Supabase request failed: ${response.status}`);
    }

    return await response.json();
}
