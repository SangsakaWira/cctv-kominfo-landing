import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { EyeIcon } from "lucide-react";
import CCTVGrid from "@/components/CCTVGrid";

interface CCTVPageProps {
  isAuthenticated?: boolean;
  userRole?: string;
}

const CCTVPage = ({
  isAuthenticated = false,
  userRole = "public",
}: CCTVPageProps) => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <EyeIcon className="h-8 w-8 text-blue-600" />
            Live CCTV Surveillance
          </h1>
          <p className="text-muted-foreground">
            Monitor live feeds from all surveillance cameras across the city
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <EyeIcon className="h-5 w-5" />
              Live Camera Feeds
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CCTVGrid isAuthenticated={isAuthenticated} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CCTVPage;
