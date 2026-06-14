export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const TOKEN = '1a29849740ad4f14a07581a5f23f5443';
  const BASE = 'https://api.football-data.org/v4/competitions/WC';
  const HEADERS = { 'X-Auth-Token': TOKEN };

  try {
    const [matchesResp, standingsResp] = await Promise.all([
      fetch(`${BASE}/matches?status=FINISHED`, { headers: HEADERS }),
      fetch(`${BASE}/standings`, { headers: HEADERS }),
    ]);

    const matches = matchesResp.ok ? await matchesResp.json() : { matches: [] };
    const standings = standingsResp.ok ? await standingsResp.json() : { standings: [] };

    res.status(200).json({ matches, standings });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
