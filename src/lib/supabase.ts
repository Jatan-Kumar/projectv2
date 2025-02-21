import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const trackEvent = async (eventName: string, eventParams = {}) => {
  const { error } = await supabase
    .from('analytics_events')
    .insert([
      {
        event_name: eventName,
        event_params: eventParams,
        timestamp: new Date().toISOString()
      }
    ]);

  if (error) {
    console.error('Error tracking event:', error);
  }
};