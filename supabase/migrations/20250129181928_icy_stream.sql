/*
  # Create analytics events table

  1. New Tables
    - `analytics_events`
      - `id` (uuid, primary key)
      - `event_name` (text)
      - `event_params` (jsonb)
      - `timestamp` (timestamptz)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `analytics_events` table
    - Add policy for authenticated users to insert events
    - Add policy for authenticated users to read events
*/

CREATE TABLE IF NOT EXISTS analytics_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name text NOT NULL,
  event_params jsonb DEFAULT '{}'::jsonb,
  timestamp timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE analytics_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable insert for authenticated users only"
  ON analytics_events
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Enable read access for authenticated users only"
  ON analytics_events
  FOR SELECT
  TO authenticated
  USING (true);