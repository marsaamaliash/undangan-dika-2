export default async function handler(req, res) {

  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxV6nu0fGSxQjoHOAFhjlDamQ0XDhwzaM6_isGYHZWgZBETmyoTLJ0a9L3TGVqxhSWN/exec';

  if (req.query.debug === 'url') {
    return res.status(200).json({ url: APPS_SCRIPT_URL });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const response = await fetch(APPS_SCRIPT_URL);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
