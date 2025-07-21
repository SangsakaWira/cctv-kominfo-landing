import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  FileTextIcon,
  DownloadIcon,
  CalendarIcon,
  AlertTriangleIcon,
  ActivityIcon,
  TrendingUpIcon,
} from "lucide-react";

interface ReportsPageProps {
  isAuthenticated?: boolean;
  userRole?: string;
}

const ReportsPage = ({
  isAuthenticated = false,
  userRole = "public",
}: ReportsPageProps) => {
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const dailyReports = [
    {
      id: "daily-001",
      date: "2023-06-15",
      incidents: 12,
      resolved: 10,
      pending: 2,
      status: "completed",
    },
    {
      id: "daily-002",
      date: "2023-06-14",
      incidents: 8,
      resolved: 8,
      pending: 0,
      status: "completed",
    },
    {
      id: "daily-003",
      date: "2023-06-13",
      incidents: 15,
      resolved: 13,
      pending: 2,
      status: "completed",
    },
  ];

  const incidentReports = [
    {
      id: "inc-001",
      type: "Security Alert",
      location: "Downtown Main Street",
      time: "14:30",
      status: "resolved",
      priority: "high",
    },
    {
      id: "inc-002",
      type: "Traffic Violation",
      location: "Highway Entrance",
      time: "12:15",
      status: "pending",
      priority: "medium",
    },
    {
      id: "inc-003",
      type: "Suspicious Activity",
      location: "City Park",
      time: "09:45",
      status: "investigating",
      priority: "high",
    },
  ];

  const systemHealthReports = [
    {
      id: "sys-001",
      metric: "Camera Uptime",
      value: "99.7%",
      status: "excellent",
      trend: "up",
    },
    {
      id: "sys-002",
      metric: "Network Bandwidth",
      value: "78%",
      status: "good",
      trend: "stable",
    },
    {
      id: "sys-003",
      metric: "Storage Capacity",
      value: "65%",
      status: "warning",
      trend: "up",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "resolved":
      case "excellent":
        return "bg-green-500";
      case "pending":
      case "investigating":
      case "warning":
        return "bg-yellow-500";
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-orange-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <FileTextIcon className="h-8 w-8 text-blue-600" />
            Reports & Analytics
          </h1>
          <p className="text-muted-foreground">
            Comprehensive reporting system for surveillance activities and
            system performance
          </p>
        </div>

        {!isAuthenticated ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <FileTextIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Authentication Required
                </h3>
                <p className="text-muted-foreground mb-4">
                  Please log in to access detailed reports and analytics.
                </p>
                <Button>Login to View Reports</Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="daily" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="daily" className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                Daily Reports
              </TabsTrigger>
              <TabsTrigger
                value="incidents"
                className="flex items-center gap-2"
              >
                <AlertTriangleIcon className="h-4 w-4" />
                Incident Reports
              </TabsTrigger>
              <TabsTrigger value="system" className="flex items-center gap-2">
                <ActivityIcon className="h-4 w-4" />
                System Health
              </TabsTrigger>
            </TabsList>

            <TabsContent value="daily" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <CalendarIcon className="h-5 w-5" />
                      Daily Activity Reports
                    </span>
                    <Button variant="outline" size="sm">
                      <DownloadIcon className="h-4 w-4 mr-2" />
                      Export All
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dailyReports.map((report) => (
                      <div
                        key={report.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                        onClick={() => setSelectedReport(report.id)}
                      >
                        <div className="flex items-center gap-4">
                          <div>
                            <h3 className="font-medium">{report.date}</h3>
                            <p className="text-sm text-muted-foreground">
                              {report.incidents} incidents • {report.resolved}{" "}
                              resolved • {report.pending} pending
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className={`${getStatusColor(report.status)} text-white`}
                          >
                            {report.status}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <DownloadIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="incidents" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <AlertTriangleIcon className="h-5 w-5" />
                      Security Incident Reports
                    </span>
                    <Button variant="outline" size="sm">
                      <DownloadIcon className="h-4 w-4 mr-2" />
                      Export All
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {incidentReports.map((incident) => (
                      <div
                        key={incident.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <div className="flex items-center gap-4">
                          <div>
                            <h3 className="font-medium">{incident.type}</h3>
                            <p className="text-sm text-muted-foreground">
                              {incident.location} • {incident.time}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className={`${getStatusColor(incident.priority)} text-white`}
                          >
                            {incident.priority}
                          </Badge>
                          <Badge
                            variant="outline"
                            className={`${getStatusColor(incident.status)} text-white`}
                          >
                            {incident.status}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <DownloadIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="system" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <ActivityIcon className="h-5 w-5" />
                      System Performance Reports
                    </span>
                    <Button variant="outline" size="sm">
                      <DownloadIcon className="h-4 w-4 mr-2" />
                      Export All
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {systemHealthReports.map((metric) => (
                      <div
                        key={metric.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-4">
                          <div>
                            <h3 className="font-medium">{metric.metric}</h3>
                            <p className="text-sm text-muted-foreground">
                              Current value: {metric.value}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className={`${getStatusColor(metric.status)} text-white`}
                          >
                            {metric.status}
                          </Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <TrendingUpIcon className="h-4 w-4 mr-1" />
                            {metric.trend}
                          </div>
                          <Button variant="ghost" size="sm">
                            <DownloadIcon className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default ReportsPage;
