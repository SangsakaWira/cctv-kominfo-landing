import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  LockIcon,
  UserIcon,
  AlertCircleIcon,
  LogOutIcon,
  ShieldIcon,
} from "lucide-react";

interface AuthenticationPanelProps {
  isAuthenticated?: boolean;
  onLogin?: (email: string, password: string) => void;
  onLogout?: () => void;
  userData?: {
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
}

const AuthenticationPanel = ({
  isAuthenticated = false,
  onLogin = () => {},
  onLogout = () => {},
  userData = {
    name: "John Doe",
    email: "john.doe@smartcity.gov",
    role: "Security Admin",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
  },
}: AuthenticationPanelProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("login");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    // Basic validation
    if (!email || !password) {
      setError("Please enter both email and password");
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      onLogin(email, password);
      setIsLoading(false);
      // In a real app, error handling would be done based on the response
    }, 1000);
  };

  const handleLogout = () => {
    onLogout();
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "destructive";
      case "security admin":
        return "default";
      case "operator":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-background border shadow-lg">
      {!isAuthenticated ? (
        <>
          <CardHeader>
            <div className="flex items-center justify-center mb-4">
              <ShieldIcon className="h-10 w-10 text-primary" />
            </div>
            <CardTitle className="text-2xl text-center">
              Smart City Security
            </CardTitle>
            <CardDescription className="text-center">
              Secure access to city surveillance system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="request">Request Access</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircleIcon className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="name@department.gov"
                        className="pl-10"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <LockIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading ? "Authenticating..." : "Login"}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="request">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="request-email">Work Email</Label>
                    <Input
                      id="request-email"
                      type="email"
                      placeholder="name@department.gov"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      placeholder="e.g. Police, Traffic Management"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason for Access</Label>
                    <Input
                      id="reason"
                      placeholder="Brief description of your role"
                    />
                  </div>

                  <Button className="w-full">Submit Request</Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </>
      ) : (
        <>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12 border-2 border-primary">
                <AvatarImage src={userData.avatar} alt={userData.name} />
                <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{userData.name}</CardTitle>
                <CardDescription>{userData.email}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Role</span>
                <Badge variant={getRoleBadgeColor(userData.role) as any}>
                  {userData.role}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Status</span>
                <Badge
                  variant="outline"
                  className="bg-green-500/10 text-green-500 border-green-500/20"
                >
                  Active
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Last Login</span>
                <span className="text-sm text-muted-foreground">
                  {new Date().toLocaleDateString()} at{" "}
                  {new Date().toLocaleTimeString()}
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full" onClick={handleLogout}>
              <LogOutIcon className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  );
};

export default AuthenticationPanel;
