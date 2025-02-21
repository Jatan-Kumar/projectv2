import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface AnalyticsData {
  pageViews: number;
  buttonClicks: number;
  timestamp: string;
}

export default function Dashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData[]>([]);

  useEffect(() => {
    const fetchAnalytics = async () => {
      const { data, error } = await supabase
        .from('analytics_events')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(7);

      if (error) {
        console.error('Error fetching analytics:', error);
        return;
      }

      // Process the data to group by date
      const processedData = data.reduce((acc: Record<string, AnalyticsData>, event) => {
        const date = new Date(event.timestamp).toLocaleDateString();
        if (!acc[date]) {
          acc[date] = {
            timestamp: date,
            pageViews: 0,
            buttonClicks: 0
          };
        }

        if (event.event_name === 'page_view') {
          acc[date].pageViews++;
        } else if (event.event_name === 'button_click') {
          acc[date].buttonClicks++;
        }

        return acc;
      }, {});

      setAnalyticsData(Object.values(processedData).reverse());
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="min-h-screen pt-20 bg-primary">
      <div className="container mx-auto px-6">
        <h1 className="text-3xl font-bold text-textPrimary mb-8">Analytics Dashboard</h1>
        
        <div className="grid gap-6 mb-8">
          <div className="bg-primary/50 p-6 rounded-lg border border-textSecondary/20">
            <h2 className="text-xl font-bold text-textPrimary mb-4">Website Traffic</h2>
            <LineChart width={800} height={400} data={analyticsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="timestamp" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="pageViews" stroke="#64ffda" name="Page Views" />
              <Line type="monotone" dataKey="buttonClicks" stroke="#8892b0" name="Button Clicks" />
            </LineChart>
          </div>
        </div>
      </div>
    </div>
  );
}