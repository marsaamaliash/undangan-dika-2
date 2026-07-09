export default async function handler(req, res) {

  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzKtARjgTpaWbYymbo7_K05OknGKzZ7Kzzuudsfcbtwh5C2DH2PPyo1HcE2dTJue7PY/exec';

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify(req.body),
      headers: { 'Content-Type': 'application/json' }
    });

    const result = await response.text();
    res.status(200).json({ success: true, result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
