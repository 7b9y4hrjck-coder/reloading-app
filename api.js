// API-ready data service. Replace getData() with fetch('/api/...') when the backend is deployed.
window.ReloadingAPI = (() => {
  const d = window.RELOADING_DATA;
  const manufacturerById = new Map(d.manufacturers.map(x=>[x.id,x]));
  const retailerById = new Map(d.retailers.map(x=>[x.id,x]));
  const pricesByProjectile = new Map();
  d.prices.forEach(p => { if(!pricesByProjectile.has(p.projectile_id)) pricesByProjectile.set(p.projectile_id,[]); pricesByProjectile.get(p.projectile_id).push(p); });
  function enrich(p){
    const prices=(pricesByProjectile.get(p.id)||[]).filter(x=>retailerById.get(x.retailer_id)?.verified);
    const lowest=prices.length?Math.min(...prices.map(x=>x.cost_per_round)):null;
    return {...p,manufacturer:manufacturerById.get(p.manufacturer_id)?.name||'Unknown', prices:prices.map(x=>({...x,retailer:retailerById.get(x.retailer_id)?.name||'Unknown'})), lowest_verified_cost_per_round:lowest, last_verified:prices.length?prices.map(x=>x.verified_at).sort().at(-1):null};
  }
  return {
    async getProjectiles(){ return d.projectiles.map(enrich); },
    async getProjectile(id){ const p=d.projectiles.find(x=>x.id===Number(id)); return p?enrich(p):null; },
    async getManufacturers(){ return d.manufacturers; },
    async getFilters(){ return {calibers:[...new Set(d.projectiles.map(x=>x.caliber))].sort(),weights:[...new Set(d.projectiles.map(x=>x.weight_grains))].sort((a,b)=>a-b),types:[...new Set(d.projectiles.map(x=>x.manufacturer_type))].sort()}; }
  };
})();
