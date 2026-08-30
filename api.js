const SUPABASE_URL = "https://rubjadkltlbenahdutpl.supabase.co";
const SUPABASE_KEY = "YOUR_PUBLISHABLE_KEY";

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
