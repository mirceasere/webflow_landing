const { neon } = require('@neondatabase/serverless');

module.exports = async (req, res) => {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Get data from request body
    const { name, email, company, crm, team_size, role } = req.body;

    if (!email || !name) {
        return res.status(400).json({ error: 'Name and Email are required' });
    }

    try {
        const sql = neon(process.env.DATABASE_URL);

        // Insert into database
        // Assuming table 'submissions' exists with these columns
        await sql`
            INSERT INTO submissions (name, email, company, crm, team_size, role, created_at)
            VALUES (${name}, ${email}, ${company}, ${crm}, ${parseInt(team_size) || 0}, ${role}, NOW())
        `;

        // Note: The neon driver returns the query result. If we needed the ID, we'd do:
        // const result = await sql`... RETURNING id`;
        // but for now, we'll just return success to keep it simple and robust, 
        // or we can add RETURNING id if strictly necessary. 
        // Let's stick to the user's "attach this" style which is simpler, 
        // but the original code returned an ID. Let's add RETURNING id to be safe.

        // Refined query with returning ID to match previous behavior best as possible
        const result = await sql`
            INSERT INTO submissions (name, email, company, crm, team_size, role, created_at)
            VALUES (${name}, ${email}, ${company}, ${crm}, ${parseInt(team_size) || 0}, ${role}, NOW())
            RETURNING id
        `;

        return res.status(200).json({ success: true, id: result[0]?.id });

    } catch (error) {
        console.error('Database Error:', error);
        return res.status(500).json({
            error: 'Internal Server Error',
            details: error.message
        });
    }
};
