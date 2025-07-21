import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ActivityIcon,
  AlertCircleIcon,
  ClockIcon,
  BarChart3Icon,
} from "lucide-react";

interface MetricsDashboardProps {
  isAuthenticated?: boolean;
  userRole?: "admin" | "security" | "city_official" | "public";
  safetyScore?: number;
  incidentResponseTime?: number;
  systemUptime?: number;
  metrics?: {
    dailyIncidents?: number;
    resolvedIncidents?: number;
    pendingAlerts?: number;
    cameraStatus?: {
      online: number;
      offline: number;
      maintenance: number;
    };
    weeklyTrends?: {
      incidents: number[];
      responseTime: number[];
    };
  };
}

const MetricsDashboard: React.FC<MetricsDashboardProps> = ({
  isAuthenticated = false,
  userRole = "public",
  safetyScore = 87,
  incidentResponseTime = 4.2,
  systemUptime = 99.7,
  metrics = {
    dailyIncidents: 12,
    resolvedIncidents: 10,
    pendingAlerts: 3,
    cameraStatus: {
      online: 142,
      offline: 8,
      maintenance: 5,
    },
    weeklyTrends: {
      incidents: [8, 12, 15, 10, 7, 12, 14],
      responseTime: [5.1, 4.8, 4.5, 4.2, 4.3, 4.0, 4.2],
    },
  },
}) => {
  // Determine what metrics to show based on authentication status and role
  const showDetailedMetrics = isAuthenticated && userRole !== "public";
  const showAdminMetrics =
    isAuthenticated && (userRole === "admin" || userRole === "security");

  return (
    <div className="w-full bg-background p-4 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">City Safety Metrics</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Safety Score Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Safety Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{safetyScore}%</div>
              <div className="flex items-center text-green-500">
                <ArrowUpIcon className="h-4 w-4 mr-1" />
                <span className="text-xs">2.5%</span>
              </div>
            </div>
            <Progress value={safetyScore} className="mt-2" />
          </CardContent>
        </Card>

        {/* Response Time Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Avg. Response Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                {incidentResponseTime} min
              </div>
              <div className="flex items-center text-green-500">
                <ArrowDownIcon className="h-4 w-4 mr-1" />
                <span className="text-xs">0.3 min</span>
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-2">
              Target: &lt;5 minutes
            </div>
          </CardContent>
        </Card>

        {/* System Uptime Card */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">System Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">{systemUptime}%</div>
              <ActivityIcon className="h-5 w-5 text-blue-500" />
            </div>
            <Progress value={systemUptime} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      {showDetailedMetrics && (
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="incidents">Incidents</TabsTrigger>
            <TabsTrigger value="cameras">Camera Status</TabsTrigger>
            {showAdminMetrics && (
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <AlertCircleIcon className="h-4 w-4 mr-2 text-amber-500" />
                    Daily Incidents
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {metrics.dailyIncidents}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <ClockIcon className="h-4 w-4 mr-2 text-green-500" />
                    Resolved
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {metrics.resolvedIncidents}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <AlertCircleIcon className="h-4 w-4 mr-2 text-red-500" />
                    Pending Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {metrics.pendingAlerts}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <BarChart3Icon className="h-4 w-4 mr-2 text-blue-500" />
                    Weekly Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between h-10">
                    {metrics.weeklyTrends?.incidents.map((value, index) => (
                      <div
                        key={index}
                        className="bg-blue-500 w-3 rounded-t-sm"
                        style={{ height: `${(value / 20) * 100}%` }}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="incidents" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Incident Response Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-4">
                  Weekly response time trend (minutes)
                </div>
                <div className="flex items-end justify-between h-32 gap-2">
                  {metrics.weeklyTrends?.responseTime.map((value, index) => (
                    <div key={index} className="flex flex-col items-center">
                      <div
                        className="bg-green-500 w-8 rounded-t-sm"
                        style={{ height: `${(value / 6) * 100}%` }}
                      />
                      <span className="text-xs mt-1">{value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cameras" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Online Cameras
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-500">
                    {metrics.cameraStatus?.online}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Offline Cameras
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-500">
                    {metrics.cameraStatus?.offline}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Maintenance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-amber-500">
                    {metrics.cameraStatus?.maintenance}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {showAdminMetrics && (
            <TabsContent value="advanced" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>System Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Network Bandwidth</span>
                        <span className="text-sm">78%</span>
                      </div>
                      <Progress value={78} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Storage Capacity</span>
                        <span className="text-sm">65%</span>
                      </div>
                      <Progress value={65} />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Processing Load</span>
                        <span className="text-sm">42%</span>
                      </div>
                      <Progress value={42} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      )}

      {!showDetailedMetrics && (
        <Card className="mt-4">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center text-center p-4">
              <ActivityIcon className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium mb-2">
                Public Safety Information
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our smart city surveillance system helps maintain a safety score
                of {safetyScore}% with an average incident response time of{" "}
                {incidentResponseTime} minutes.
              </p>
              <p className="text-xs text-muted-foreground">
                Sign in to access detailed metrics and camera information.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MetricsDashboard;
