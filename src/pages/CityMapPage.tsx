import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapIcon } from "lucide-react";
import CityMap from "@/components/CityMap";

interface CityMapPageProps {
  isAuthenticated?: boolean;
  userRole?: string;
}

const CityMapPage = ({
  isAuthenticated = false,
  userRole = "public",
}: CityMapPageProps) => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="container mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <MapIcon className="h-8 w-8 text-blue-600" />
            City Surveillance Map
          </h1>
          <p className="text-muted-foreground">
            Interactive map showing all camera locations and their status
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapIcon className="h-5 w-5" />
              Interactive City Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CityMap isAuthenticated={isAuthenticated} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CityMapPage;
