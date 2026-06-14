export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  try {
    const response = await fetch(
      'https://api.football-data.org/v4/competitions/2000/matches?status=FINISHED',
      { headers: { 'X-Auth-Token': '1a29849740ad4f14a07581a5f23f5443' } }
    );
    const data = await response.json();
    res.status(200).json(data);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
}
