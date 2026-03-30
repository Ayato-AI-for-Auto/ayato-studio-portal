const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://jzysvoduyrtjxyzcwnup.supabase.co';
const supabaseKey = 'sb_secret_QCDUL4DwJrZ-aHHLYBLIcA_Az3CJmFv'; // Use secret key for bypass RLS

const supabase = createClient(supabaseUrl, supabaseKey);

const tables = ['generated_reports', 'raw_items', 'reports', 'articles', 'posts', 'content'];

async function check() {
  console.log('--- Supabase Deep Exploration ---');
  console.log('Target URL:', supabaseUrl);

  for (const table of tables) {
    console.log(`\n[Checking Table: ${table}]`);
    try {
      const { count, error: countErr } = await supabase
        .from(table)
        .select('*', { count: 'exact', head: true });

      if (countErr) {
        if (countErr.code === '42P01') {
          console.log('Status: Table does not exist.');
        } else {
          console.log('Error fetching count:', countErr.message);
        }
        continue;
      }

      console.log(`Status: Found ${count} rows.`);

      if (count > 0) {
        const { data, error: dataErr } = await supabase
          .from(table)
          .select('*')
          .limit(1);

        if (dataErr) {
          console.log('Error fetching sample:', dataErr.message);
        } else {
          console.log('Latest Sample (JSON):');
          console.log(JSON.stringify(data[0], null, 2));
        }
      }
    } catch (e) {
      console.log('System Error:', e.message);
    }
  }
  console.log('\n--- Exploration Finished ---');
}

check();
