import { Lead } from './types';

function normalizeUrl(value: string) {
  if (!value) return '';
  try { return new URL(value.startsWith('http') ? value : `https://${value}`).toString(); }
  catch { return value; }
}

function demoLeads(prompt: string): Lead[] {
  return [
    { id:'demo-1', company:'Luma Jewelry', website:'https://example.com', industry:'Jewelry / Ecommerce', location:'United States', employees:'11-50', contactName:'Alex', contactRole:'Founder', email:'', source:'Demo dataset', signal:'Active product marketing', fitReason:`Matches the requested profile: ${prompt}` },
    { id:'demo-2', company:'Glow Botanics', website:'https://example.com', industry:'Beauty / Ecommerce', location:'United Kingdom', employees:'11-50', contactName:'Maya', contactRole:'Marketing Lead', email:'', source:'Demo dataset', signal:'New product content', fitReason:`Potential fit based on: ${prompt}` }
  ];
}

export async function discoverLeads(prompt: string): Promise<Lead[]> {
  const custom = process.env.SEARCH_API_URL;
  if (custom) {
    const r = await fetch(custom, { method:'POST', headers:{'content-type':'application/json', ...(process.env.SEARCH_API_KEY ? {authorization:`Bearer ${process.env.SEARCH_API_KEY}`} : {})}, body:JSON.stringify({prompt}), cache:'no-store' });
    if (!r.ok) throw new Error(`Search provider returned ${r.status}`);
    const data = await r.json();
    const rows = Array.isArray(data) ? data : (data.leads || data.results || []);
    return rows.map((x:any,i:number)=>({ id:x.id || `lead-${Date.now()}-${i}`, company:x.company || x.name || 'Unknown', website:normalizeUrl(x.website || x.url || ''), domain:x.domain, industry:x.industry, location:x.location, employees:x.employees, contactName:x.contactName || x.contact_name, contactRole:x.contactRole || x.role, email:x.email, source:x.source || x.sourceUrl, signal:x.signal || x.trigger, fitReason:x.fitReason || x.reason }));
  }
  return demoLeads(prompt);
}
