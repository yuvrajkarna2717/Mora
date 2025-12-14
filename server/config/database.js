const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.SUPABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Supabase-like interface for compatibility
const supabase = {
  from: (table) => ({
    select: (columns = '*') => ({
      eq: (column, value) => ({
        single: async () => {
          const query = `SELECT ${columns} FROM ${table} WHERE ${column} = $1 LIMIT 1`;
          const result = await pool.query(query, [value]);
          return { data: result.rows[0], error: null };
        },
        async then(resolve) {
          const query = `SELECT ${columns} FROM ${table} WHERE ${column} = $1`;
          const result = await pool.query(query, [value]);
          return resolve({ data: result.rows, error: null });
        }
      }),
      order: (column, options) => ({
        limit: (count) => ({
          async then(resolve) {
            const direction = options?.ascending ? 'ASC' : 'DESC';
            const query = `SELECT ${columns} FROM ${table} ORDER BY ${column} ${direction} LIMIT $1`;
            const result = await pool.query(query, [count]);
            return resolve({ data: result.rows, error: null });
          }
        })
      })
    }),
    insert: (data) => ({
      select: () => ({
        single: async () => {
          const keys = Object.keys(data);
          const values = Object.values(data);
          const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
          const query = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders}) RETURNING *`;
          const result = await pool.query(query, values);
          return { data: result.rows[0], error: null };
        }
      }),
      async then(resolve) {
        const keys = Object.keys(data);
        const values = Object.values(data);
        const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
        const query = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`;
        await pool.query(query, values);
        return resolve({ error: null });
      }
    }),
    upsert: (data, options) => ({
      select: () => ({
        single: async () => {
          const keys = Object.keys(data);
          const values = Object.values(data);
          const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
          const conflictColumn = options.onConflict;
          const updateSet = keys.filter(k => k !== conflictColumn).map(k => `${k} = EXCLUDED.${k}`).join(', ');
          const query = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders}) ON CONFLICT (${conflictColumn}) DO UPDATE SET ${updateSet} RETURNING *`;
          const result = await pool.query(query, values);
          return { data: result.rows[0], error: null };
        }
      })
    }),
    delete: () => ({
      eq: (column, value) => ({
        async then(resolve) {
          const query = `DELETE FROM ${table} WHERE ${column} = $1`;
          await pool.query(query, [value]);
          return resolve({ error: null });
        }
      }),
      gte: (column, value) => ({
        lt: (column2, value2) => ({
          async then(resolve) {
            const query = `DELETE FROM ${table} WHERE ${column} >= $1 AND ${column2} < $2`;
            await pool.query(query, [value, value2]);
            return resolve({ error: null });
          }
        })
      })
    })
  })
};

module.exports = supabase;