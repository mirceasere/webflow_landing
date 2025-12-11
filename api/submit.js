const { Pool } = require('@neondatabase/serverless');

module.exports = async (req, res) => {
    // Add CORS headers
    // When using Credentials: true, Origin cannot be '*', it must be the specific domain.
    const allowedOrigin = req.headers.origin || '*';
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', allowedOrigin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Get data from request body
    const { name, email, company, crm, team_size, role } = req.body;

    // Basic validation
    if (!email || !name) {
        return res.status(400).json({ error: 'Name and Email are required' });
    }

    const pool = new Pool({ connectionString: process.env.DATABASE_URL });

    try {
        const query = `
            INSERT INTO submissions (name, email, company, crm, team_size, role, created_at)
            VALUES ($1, $2, $3, $4, $5, $6, NOW())
            RETURNING id;
        `;

        const values = [name, email, company, crm, parseInt(team_size) || 0, role];

        const result = await pool.query(query, values);

        await pool.end();

        return res.status(200).json({ success: true, id: result.rows[0].id });

    } catch (error) {
        console.error('Database Error:', error);
        return res.status(500).json({
            error: 'Internal Server Error',
            details: error.message
        });
    }
};
