/*
  # Update analytics events RLS policies

  1. Changes
    - Allow anonymous users to insert analytics events
    - Allow anonymous users to read analytics events
    
  2. Security
    - Enable public access for analytics tracking
    - Maintain data integrity with timestamped events
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON analytics_events;
DROP POLICY IF EXISTS "Enable read access for authenticated users only" ON analytics_events;

-- Create new policies for public access
CREATE POLICY "Enable insert for all users"
  ON analytics_events
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Enable read access for all users"
  ON analytics_events
  FOR SELECT
  TO anon, authenticated
  USING (true);