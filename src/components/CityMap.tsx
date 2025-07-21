import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertCircle,
  CheckCircle,
  MapPin,
  ZoomIn,
  ZoomOut,
  Layers,
} from "lucide-react";

interface CameraLocation {
  id: string;
  name: string;
  location: [number, number]; // [x, y] coordinates
  status: "online" | "offline";
  lastUpdated: string;
  description?: string;
}

interface CityMapProps {
  isAuthenticated?: boolean;
  onCameraSelect?: (cameraId: string) => void;
}

const CityMap = ({
  isAuthenticated = false,
  onCameraSelect = () => {},
}: CityMapProps) => {
  const [selectedCamera, setSelectedCamera] = useState<CameraLocation | null>(
    null,
  );
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [mapView, setMapView] = useState<"standard" | "satellite" | "traffic">(
    "standard",
  );
  const [showCameraDialog, setShowCameraDialog] = useState<boolean>(false);

  // Mock camera locations data
  const cameraLocations: CameraLocation[] = [
    {
      id: "cam-001",
      name: "Downtown Main Street",
      location: [150, 200],
      status: "online",
      lastUpdated: "2023-06-15T10:30:00Z",
      description: "Monitors main intersection at downtown area",
    },
    {
      id: "cam-002",
      name: "City Park Entrance",
      location: [300, 150],
      status: "online",
      lastUpdated: "2023-06-15T10:28:00Z",
      description: "Covers the main entrance to the city park",
    },
    {
      id: "cam-003",
      name: "Shopping Mall",
      location: [450, 250],
      status: "offline",
      lastUpdated: "2023-06-15T09:15:00Z",
      description: "Monitors the shopping mall parking area",
    },
    {
      id: "cam-004",
      name: "Train Station",
      location: [200, 350],
      status: "online",
      lastUpdated: "2023-06-15T10:32:00Z",
      description: "Covers the main entrance to the train station",
    },
    {
      id: "cam-005",
      name: "City Hall",
      location: [350, 300],
      status: "online",
      lastUpdated: "2023-06-15T10:29:00Z",
      description: "Monitors the city hall plaza",
    },
  ];

  const handleCameraClick = (camera: CameraLocation) => {
    setSelectedCamera(camera);
    setShowCameraDialog(true);
    if (isAuthenticated) {
      onCameraSelect(camera.id);
    }
  };

  const handleZoomIn = () => {
    if (zoomLevel < 2) setZoomLevel(zoomLevel + 0.2);
  };

  const handleZoomOut = () => {
    if (zoomLevel > 0.6) setZoomLevel(zoomLevel - 0.2);
  };

  return (
    <Card className="w-full h-full bg-background border shadow-md">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">City Camera Map</h2>
          <div className="flex gap-2">
            <Tabs
              defaultValue="standard"
              value={mapView}
              onValueChange={(value) => setMapView(value as any)}
            >
              <TabsList>
                <TabsTrigger value="standard">Standard</TabsTrigger>
                <TabsTrigger value="satellite">Satellite</TabsTrigger>
                {isAuthenticated && (
                  <TabsTrigger value="traffic">Traffic</TabsTrigger>
                )}
              </TabsList>
            </Tabs>
            <div className="flex gap-1">
              <Button variant="outline" size="icon" onClick={handleZoomIn}>
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={handleZoomOut}>
                <ZoomOut className="h-4 w-4" />
              </Button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Layers className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Map Layers</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        <div
          className="relative w-full h-[500px] bg-slate-100 rounded-md overflow-hidden"
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: "center center",
          }}
        >
          {/* Map background image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-300"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&q=80)`,
              opacity: mapView === "standard" ? 1 : 0,
            }}
          />
          <div
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-300"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?w=1200&q=80)`,
              opacity: mapView === "satellite" ? 1 : 0,
            }}
          />
          <div
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-300"
            style={{
              backgroundImage: `url(https://images.unsplash.com/photo-1573108724029-4c46571d6490?w=1200&q=80)`,
              opacity: mapView === "traffic" ? 1 : 0,
            }}
          />

          {/* Camera markers */}
          {cameraLocations.map((camera) => (
            <TooltipProvider key={camera.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-110"
                    style={{
                      left: camera.location[0],
                      top: camera.location[1],
                    }}
                    onClick={() => handleCameraClick(camera)}
                  >
                    <div className="flex flex-col items-center">
                      <div
                        className={`rounded-full p-1 ${camera.status === "online" ? "bg-green-500" : "bg-red-500"}`}
                      >
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      {zoomLevel > 1 && (
                        <span className="text-xs font-medium bg-background/80 px-1 rounded mt-1">
                          {camera.name}
                        </span>
                      )}
                    </div>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <div>
                    <p className="font-bold">{camera.name}</p>
                    <p className="text-xs">
                      Status:{" "}
                      {camera.status === "online" ? (
                        <span className="text-green-500 font-medium">
                          Online
                        </span>
                      ) : (
                        <span className="text-red-500 font-medium">
                          Offline
                        </span>
                      )}
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="flex gap-4">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm">Online</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm">Offline</span>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            {isAuthenticated ? (
              <span>Showing all {cameraLocations.length} cameras</span>
            ) : (
              <span>Limited view - Login for full access</span>
            )}
          </div>
        </div>
      </CardContent>

      {/* Camera details dialog */}
      <Dialog open={showCameraDialog} onOpenChange={setShowCameraDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedCamera?.name}</DialogTitle>
            <DialogDescription>
              Camera ID: {selectedCamera?.id}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="aspect-video bg-slate-800 rounded-md overflow-hidden relative">
              {selectedCamera?.status === "online" ? (
                <img
                  src={`https://images.unsplash.com/photo-1580137189272-c9379f8864fd?w=800&q=80`}
                  alt="Live feed"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-white">
                  <AlertCircle className="h-12 w-12 mb-2 text-red-500" />
                  <p>Camera Offline</p>
                  <p className="text-sm text-gray-400">
                    Last online: {selectedCamera?.lastUpdated}
                  </p>
                </div>
              )}

              {selectedCamera?.status === "online" && (
                <Badge className="absolute top-2 right-2 bg-green-500">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                    LIVE
                  </div>
                </Badge>
              )}
            </div>

            <div className="grid gap-2">
              <div className="flex items-center gap-2">
                <span className="font-medium">Status:</span>
                {selectedCamera?.status === "online" ? (
                  <div className="flex items-center text-green-500">
                    <CheckCircle className="h-4 w-4 mr-1" /> Online
                  </div>
                ) : (
                  <div className="flex items-center text-red-500">
                    <AlertCircle className="h-4 w-4 mr-1" /> Offline
                  </div>
                )}
              </div>
              <div>
                <span className="font-medium">Description:</span>
                <p className="text-sm text-muted-foreground">
                  {selectedCamera?.description}
                </p>
              </div>
              <div>
                <span className="font-medium">Last Updated:</span>
                <p className="text-sm text-muted-foreground">
                  {new Date(selectedCamera?.lastUpdated || "").toLocaleString()}
                </p>
              </div>
            </div>

            {isAuthenticated && (
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline">History</Button>
                <Button>View Full Feed</Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default CityMap;
