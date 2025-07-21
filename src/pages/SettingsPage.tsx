import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  SettingsIcon,
  UserIcon,
  ShieldIcon,
  BellIcon,
  MonitorIcon,
  HelpCircleIcon,
  PhoneIcon,
  MailIcon,
} from "lucide-react";

interface SettingsPageProps {
  isAuthenticated?: boolean;
  userRole?: string;
}

const SettingsPage = ({
  isAuthenticated = false,
  userRole = "public",
}: SettingsPageProps) => {
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sms: true,
    incidents: true,
    maintenance: false,
  });

  const [preferences, setPreferences] = useState({
    darkMode: false,
    autoRefresh: true,
    refreshInterval: 30,
    defaultView: "overview",
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <SettingsIcon className="h-8 w-8 text-blue-600" />
            Settings & Configuration
          </h1>
          <p className="text-muted-foreground">
            Manage your account preferences and system configuration
          </p>
        </div>

        {!isAuthenticated ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <SettingsIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  Authentication Required
                </h3>
                <p className="text-muted-foreground mb-4">
                  Please log in to access settings and configuration options.
                </p>
                <Button>Login to Access Settings</Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="profile" className="flex items-center gap-2">
                <UserIcon className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="notifications"
                className="flex items-center gap-2"
              >
                <BellIcon className="h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger
                value="preferences"
                className="flex items-center gap-2"
              >
                <MonitorIcon className="h-4 w-4" />
                Preferences
              </TabsTrigger>
              {(userRole === "admin" || userRole === "security") && (
                <TabsTrigger value="system" className="flex items-center gap-2">
                  <ShieldIcon className="h-4 w-4" />
                  System
                </TabsTrigger>
              )}
              <TabsTrigger value="support" className="flex items-center gap-2">
                <HelpCircleIcon className="h-4 w-4" />
                Support
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserIcon className="h-5 w-5" />
                    User Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" defaultValue="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" defaultValue="Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      defaultValue="john.doe@smartcity.gov"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" defaultValue="Security Operations" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Current Role</Label>
                      <p className="text-sm text-muted-foreground">
                        Your access level and permissions
                      </p>
                    </div>
                    <Badge variant="secondary">
                      {userRole?.charAt(0).toUpperCase() + userRole?.slice(1)}
                    </Badge>
                  </div>
                  <Separator />
                  <div className="flex justify-end">
                    <Button>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BellIcon className="h-5 w-5" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">
                      Notification Methods
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive alerts via email
                          </p>
                        </div>
                        <Switch
                          checked={notifications.email}
                          onCheckedChange={(checked) =>
                            setNotifications({
                              ...notifications,
                              email: checked,
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Push Notifications</Label>
                          <p className="text-sm text-muted-foreground">
                            Browser push notifications
                          </p>
                        </div>
                        <Switch
                          checked={notifications.push}
                          onCheckedChange={(checked) =>
                            setNotifications({
                              ...notifications,
                              push: checked,
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>SMS Alerts</Label>
                          <p className="text-sm text-muted-foreground">
                            Critical alerts via SMS
                          </p>
                        </div>
                        <Switch
                          checked={notifications.sms}
                          onCheckedChange={(checked) =>
                            setNotifications({ ...notifications, sms: checked })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Alert Types</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Security Incidents</Label>
                          <p className="text-sm text-muted-foreground">
                            High priority security alerts
                          </p>
                        </div>
                        <Switch
                          checked={notifications.incidents}
                          onCheckedChange={(checked) =>
                            setNotifications({
                              ...notifications,
                              incidents: checked,
                            })
                          }
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>Maintenance Alerts</Label>
                          <p className="text-sm text-muted-foreground">
                            System maintenance notifications
                          </p>
                        </div>
                        <Switch
                          checked={notifications.maintenance}
                          onCheckedChange={(checked) =>
                            setNotifications({
                              ...notifications,
                              maintenance: checked,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />
                  <div className="flex justify-end">
                    <Button>Save Notification Settings</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MonitorIcon className="h-5 w-5" />
                    Display & Interface Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Dark Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Use dark theme for better visibility
                        </p>
                      </div>
                      <Switch
                        checked={preferences.darkMode}
                        onCheckedChange={(checked) =>
                          setPreferences({ ...preferences, darkMode: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Auto Refresh</Label>
                        <p className="text-sm text-muted-foreground">
                          Automatically refresh live feeds
                        </p>
                      </div>
                      <Switch
                        checked={preferences.autoRefresh}
                        onCheckedChange={(checked) =>
                          setPreferences({
                            ...preferences,
                            autoRefresh: checked,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="refreshInterval">
                      Refresh Interval (seconds)
                    </Label>
                    <Input
                      id="refreshInterval"
                      type="number"
                      value={preferences.refreshInterval}
                      onChange={(e) =>
                        setPreferences({
                          ...preferences,
                          refreshInterval: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>

                  <Separator />
                  <div className="flex justify-end">
                    <Button>Save Preferences</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {(userRole === "admin" || userRole === "security") && (
              <TabsContent value="system" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShieldIcon className="h-5 w-5" />
                      System Configuration
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <h3 className="font-medium text-yellow-800 mb-2">
                        Administrator Access Required
                      </h3>
                      <p className="text-sm text-yellow-700">
                        System configuration changes require elevated privileges
                        and may affect all users.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Camera Network Settings</Label>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          Configure Camera Network
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Label>User Management</Label>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          Manage User Accounts
                        </Button>
                      </div>
                      <div className="space-y-2">
                        <Label>System Backup</Label>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                        >
                          Configure Backup Settings
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            <TabsContent value="support" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircleIcon className="h-5 w-5" />
                    Help & Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <PhoneIcon className="h-5 w-5 text-blue-600" />
                          <h3 className="font-medium">Emergency Contact</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          For urgent security matters
                        </p>
                        <p className="font-medium">911</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <PhoneIcon className="h-5 w-5 text-green-600" />
                          <h3 className="font-medium">Technical Support</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          System issues and questions
                        </p>
                        <p className="font-medium">(555) 123-4567</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <MailIcon className="h-5 w-5 text-purple-600" />
                          <h3 className="font-medium">Email Support</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          Non-urgent inquiries
                        </p>
                        <p className="font-medium">support@smartcity.gov</p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <HelpCircleIcon className="h-5 w-5 text-orange-600" />
                          <h3 className="font-medium">Documentation</h3>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          User guides and tutorials
                        </p>
                        <Button variant="outline" size="sm">
                          View Documentation
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">System Information</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <Label>Version</Label>
                        <p className="text-muted-foreground">v2.1.0</p>
                      </div>
                      <div>
                        <Label>Last Updated</Label>
                        <p className="text-muted-foreground">June 15, 2023</p>
                      </div>
                      <div>
                        <Label>License</Label>
                        <p className="text-muted-foreground">Enterprise</p>
                      </div>
                      <div>
                        <Label>Support Level</Label>
                        <p className="text-muted-foreground">24/7 Premium</p>
                      </div>
                    </div>
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

export default SettingsPage;
