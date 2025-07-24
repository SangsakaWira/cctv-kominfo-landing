import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  MoonIcon,
  SunIcon,
  ShieldIcon,
  MapIcon,
  BarChart3Icon,
  EyeIcon,
  TrendingUpIcon,
  UsersIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  PlayIcon,
  HomeIcon,
  SettingsIcon,
  FileTextIcon,
  PhoneIcon,
} from "lucide-react";
import CCTVGrid from "./CCTVGrid";
import CityMap from "./CityMap";
import MetricsDashboard from "./MetricsDashboard";
import AuthenticationPanel from "./AuthenticationPanel";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [userRole, setUserRole] = useState<
    "public" | "admin" | "security" | "city-official"
  >("public");

  const handleLogin = (email: string, password: string) => {
    // Simulate authentication logic
    setIsAuthenticated(true);
    setUserRole("security");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole("public");
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div
      className={`min-h-screen ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      {/* Header */}
      <header
        className={`${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"} border-b backdrop-blur-sm bg-opacity-95 sticky top-0 z-50`}
      >
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="relative">
              {/* <ShieldIcon className="h-8 w-8 text-blue-600" /> */}
              <img src="/logo.jpeg" className="h-12"></img>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
               Smart CCTV System
              </h1>
              <p className="text-xs text-muted-foreground">
                Sistem Pemantauan 24 Jam Berbasis Artificial Intelligence
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Badge
              variant="outline"
              className="hidden md:flex items-center gap-1"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              System Online
            </Badge>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </Button>

            {isAuthenticated && (
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">
                  {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                </Badge>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <div
          className={`${isDarkMode ? "bg-gray-800/50" : "bg-gray-50/50"} border-t border-gray-200 dark:border-gray-700`}
        >
          <div className="container mx-auto px-4">
            <NavigationMenu className="mx-auto">
              <NavigationMenuList className="flex-wrap justify-center">
                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => setActiveTab("overview")}
                  >
                    <HomeIcon className="h-4 w-4" />
                    Dashboard
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[400px]">
                      <NavigationMenuLink
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => setActiveTab("overview")}
                      >
                        <div className="text-sm font-medium leading-none">
                          Overview
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          System status and quick statistics
                        </p>
                      </NavigationMenuLink>
                      <NavigationMenuLink
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => (window.location.href = "/metrics")}
                      >
                        <div className="text-sm font-medium leading-none">
                          Analytics
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Detailed performance metrics
                        </p>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => setActiveTab("cctv")}
                  >
                    <EyeIcon className="h-4 w-4" />
                    Surveillance
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[400px]">
                      <NavigationMenuLink
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => (window.location.href = "/cctv")}
                      >
                        <div className="text-sm font-medium leading-none">
                          Live Feeds
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Real-time CCTV camera feeds
                        </p>
                      </NavigationMenuLink>
                      <NavigationMenuLink
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => (window.location.href = "/map")}
                      >
                        <div className="text-sm font-medium leading-none">
                          Camera Map
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Interactive city surveillance map
                        </p>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors hover:text-accent-foreground cursor-pointer"
                    onClick={() => (window.location.href = "/map")}
                  >
                    <MapIcon className="h-4 w-4" />
                    City Map
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="flex items-center gap-2">
                    <FileTextIcon className="h-4 w-4" />
                    Reports
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[300px]">
                      <NavigationMenuLink
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => (window.location.href = "/reports")}
                      >
                        <div className="text-sm font-medium leading-none">
                          Daily Reports
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Daily surveillance summaries
                        </p>
                      </NavigationMenuLink>
                      <NavigationMenuLink
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => (window.location.href = "/reports")}
                      >
                        <div className="text-sm font-medium leading-none">
                          Incident Reports
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Security incident documentation
                        </p>
                      </NavigationMenuLink>
                      <NavigationMenuLink
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => (window.location.href = "/reports")}
                      >
                        <div className="text-sm font-medium leading-none">
                          System Health
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Technical performance reports
                        </p>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="flex items-center gap-2">
                    <SettingsIcon className="h-4 w-4" />
                    Settings
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid gap-3 p-4 w-[300px]">
                      {isAuthenticated && userRole === "admin" && (
                        <NavigationMenuLink
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                          onClick={() => (window.location.href = "/settings")}
                        >
                          <div className="text-sm font-medium leading-none">
                            System Config
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Configure system parameters
                          </p>
                        </NavigationMenuLink>
                      )}
                      <NavigationMenuLink
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => (window.location.href = "/settings")}
                      >
                        <div className="text-sm font-medium leading-none">
                          User Preferences
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Customize your experience
                        </p>
                      </NavigationMenuLink>
                      <NavigationMenuLink
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground cursor-pointer"
                        onClick={() => (window.location.href = "/settings")}
                      >
                        <div className="text-sm font-medium leading-none">
                          Help & Support
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Get assistance and documentation
                        </p>
                      </NavigationMenuLink>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {!isAuthenticated && (
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="/ampera.jpg" // Ganti dengan path gambar kamu
              alt="Background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-black/50" />
          <div className="container mx-auto px-4 py-16 relative">
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-white">
                Sistem Pemantaun CCTV
                <br />
                24/7 Pemantauan
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-white">
                Advanced AI-powered surveillance system monitoring our city's
                safety with real-time analytics, intelligent threat detection,
                and rapid emergency response capabilities.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-6 text-center">
                    <EyeIcon className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2 text-white">150+</h3>
                    <p className="text-muted-foreground text-white">Active Cameras</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-6 text-center">
                    <TrendingUpIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2 text-white">87%</h3>
                    <p className="text-muted-foreground text-white">Safety Score</p>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm border-white/20">
                  <CardContent className="p-6 text-center">
                    <UsersIcon className="h-12 w-12 text-purple-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2 text-white">4.2min</h3>
                    <p className="text-muted-foreground text-white">Response Time</p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => (window.location.href = "/cctv")}
                >
                  <PlayIcon className="mr-2 h-5 w-5" />
                  View Live Feeds
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => (window.location.href = "/map")}
                >
                  <MapIcon className="mr-2 h-5 w-5" />
                  Explore City Map
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="flex justify-between items-center mb-6">
                <TabsList className="grid w-full grid-cols-4 lg:w-auto">
                  <TabsTrigger
                    value="overview"
                    className="flex items-center gap-2"
                  >
                    <BarChart3Icon className="h-4 w-4" /> Overview
                  </TabsTrigger>
                  <TabsTrigger value="cctv" className="flex items-center gap-2">
                    <EyeIcon className="h-4 w-4" /> Live Feeds
                  </TabsTrigger>
                  <TabsTrigger value="map" className="flex items-center gap-2">
                    <MapIcon className="h-4 w-4" /> City Map
                  </TabsTrigger>
                  <TabsTrigger
                    value="metrics"
                    className="flex items-center gap-2"
                  >
                    <TrendingUpIcon className="h-4 w-4" /> Analytics
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="overview" className="mt-4 space-y-6">
                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Active Cameras
                          </p>
                          <p className="text-2xl font-bold text-green-600">
                            142
                          </p>
                        </div>
                        <CheckCircleIcon className="h-8 w-8 text-green-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Offline Cameras
                          </p>
                          <p className="text-2xl font-bold text-red-600">8</p>
                        </div>
                        <AlertTriangleIcon className="h-8 w-8 text-red-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Today's Incidents
                          </p>
                          <p className="text-2xl font-bold text-blue-600">12</p>
                        </div>
                        <BarChart3Icon className="h-8 w-8 text-blue-500" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            System Uptime
                          </p>
                          <p className="text-2xl font-bold text-purple-600">
                            99.7%
                          </p>
                        </div>
                        <TrendingUpIcon className="h-8 w-8 text-purple-500" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Featured CCTV Preview */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <EyeIcon className="h-5 w-5" />
                        Featured Live Feeds
                      </CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setActiveTab("cctv")}
                      >
                        View All <ArrowRightIcon className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CCTVGrid
                      isAuthenticated={isAuthenticated}
                      maxCameras={4}
                    />
                  </CardContent>
                </Card>

                {/* Quick Metrics */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3Icon className="h-5 w-5" />
                      Safety Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MetricsDashboard
                      isAuthenticated={isAuthenticated}
                      userRole={userRole as any}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="cctv" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <EyeIcon className="h-5 w-5" />
                      Live CCTV Surveillance Network
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CCTVGrid isAuthenticated={isAuthenticated} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="map" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapIcon className="h-5 w-5" />
                      Interactive City Surveillance Map
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CityMap isAuthenticated={isAuthenticated} />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="metrics" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUpIcon className="h-5 w-5" />
                      Advanced Analytics Dashboard
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MetricsDashboard
                      isAuthenticated={isAuthenticated}
                      userRole={userRole as any}
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Authentication/User Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <AuthenticationPanel
                isAuthenticated={isAuthenticated}
                onLogin={handleLogin}
                onLogout={handleLogout}
              />

              {isAuthenticated && (
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle className="text-sm">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    {userRole === "admin" && (
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <ShieldIcon className="mr-2 h-4 w-4" />
                        System Configuration
                      </Button>
                    )}
                    {(userRole === "security" || userRole === "admin") && (
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                      >
                        <AlertTriangleIcon className="mr-2 h-4 w-4" />
                        Incident Management
                      </Button>
                    )}
                    <Button variant="outline" className="w-full justify-start">
                      <BarChart3Icon className="mr-2 h-4 w-4" />
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className={`mt-16 py-8 ${isDarkMode ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-200"} border-t`}
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <ShieldIcon className="h-6 w-6 text-blue-600" />
                <span className="font-bold text-lg">Smart CCTV</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Advanced surveillance technology protecting our community with
                intelligent monitoring and rapid response capabilities.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">System Status</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>All Systems Operational</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>142 Cameras Online</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>99.7% Uptime</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Emergency Contact</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Emergency: 911</p>
                <p>Security Control: (555) 123-4567</p>
                <p>Technical Support: support@smartcity.gov</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 text-center">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} SmartCity Surveillance System.
              All rights reserved.
            </p>
            <p className="text-xs mt-2 text-muted-foreground">
              Secure • Reliable • Innovative • Protecting Our Community
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
