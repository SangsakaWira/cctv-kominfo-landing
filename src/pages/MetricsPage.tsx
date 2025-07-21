import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3Icon } from "lucide-react";
import MetricsDashboard from "@/components/MetricsDashboard";

interface MetricsPageProps {
  isAuthenticated?: boolean;
  userRole?: string;
}

const MetricsPage = ({
  isAuthenticated = false,
  userRole = "public",
}: MetricsPageProps) => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <BarChart3Icon className="h-8 w-8 text-blue-600" />
            Analytics Dashboard
          </h1>
          <p className="text-muted-foreground">
            Comprehensive metrics and analytics for city surveillance system
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3Icon className="h-5 w-5" />
              System Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <MetricsDashboard
              isAuthenticated={isAuthenticated}
              userRole={userRole as any}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MetricsPage;
