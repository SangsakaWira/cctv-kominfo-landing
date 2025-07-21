import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2, ZoomIn, ZoomOut, RotateCw } from "lucide-react";

interface CCTVCamera {
  id: string;
  name: string;
  location: string;
  status: "online" | "offline" | "maintenance";
  thumbnail: string;
  feed: string;
}

interface CCTVGridProps {
  cameras?: CCTVCamera[];
  isAuthenticated?: boolean;
  maxCameras?: number;
}

const CCTVGrid = ({
  cameras = defaultCameras,
  isAuthenticated = false,
  maxCameras = 8,
}: CCTVGridProps) => {
  const [selectedCamera, setSelectedCamera] = useState<CCTVCamera | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Limit cameras based on authentication status
  const displayCameras = isAuthenticated
    ? cameras
    : cameras.slice(0, maxCameras);

  const handleCameraClick = (camera: CCTVCamera) => {
    setSelectedCamera(camera);
    setZoomLevel(1); // Reset zoom level when opening a new camera
  };

  const handleCloseDialog = () => {
    setSelectedCamera(null);
    setIsFullscreen(false);
    setZoomLevel(1);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleZoomIn = () => {
    if (zoomLevel < 2) setZoomLevel(zoomLevel + 0.2);
  };

  const handleZoomOut = () => {
    if (zoomLevel > 0.6) setZoomLevel(zoomLevel - 0.2);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "offline":
        return "bg-red-500";
      case "maintenance":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Live CCTV Feeds</h2>
        {!isAuthenticated && (
          <Badge variant="outline" className="bg-blue-100 text-blue-800">
            Limited View - Login for Full Access
          </Badge>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayCameras.map((camera) => (
          <Card
            key={camera.id}
            className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
            onClick={() => handleCameraClick(camera)}
          >
            <div className="relative">
              <img
                src={camera.thumbnail}
                alt={`${camera.name} feed`}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge
                  variant="secondary"
                  className={`${getStatusColor(camera.status)} text-white`}
                >
                  {camera.status.charAt(0).toUpperCase() +
                    camera.status.slice(1)}
                </Badge>
              </div>
            </div>
            <CardContent className="p-3">
              <h3 className="font-medium">{camera.name}</h3>
              <p className="text-sm text-gray-500">{camera.location}</p>
            </CardContent>
          </Card>
        ))}

        {!isAuthenticated && cameras.length > maxCameras && (
          <Card className="flex items-center justify-center h-48 bg-gray-50 border-dashed border-2">
            <CardContent className="text-center">
              <p className="text-gray-500 mb-2">
                +{cameras.length - maxCameras} more cameras
              </p>
              <Button variant="outline" size="sm">
                Login to View All
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Camera Feed Dialog */}
      <Dialog
        open={!!selectedCamera}
        onOpenChange={() => selectedCamera && handleCloseDialog()}
      >
        <DialogContent
          className={`${isFullscreen ? "max-w-[95vw] h-[90vh]" : "max-w-4xl"} p-0`}
        >
          {selectedCamera && (
            <>
              <DialogHeader className="p-4 flex-row justify-between items-center">
                <DialogTitle>
                  {selectedCamera.name} - {selectedCamera.location}
                </DialogTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="icon" onClick={handleZoomIn}>
                    <ZoomIn className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon" onClick={handleZoomOut}>
                    <ZoomOut className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleFullscreen}
                  >
                    {isFullscreen ? (
                      <Minimize2 className="h-4 w-4" />
                    ) : (
                      <Maximize2 className="h-4 w-4" />
                    )}
                  </Button>
                  <Button variant="outline" size="icon">
                    <RotateCw className="h-4 w-4" />
                  </Button>
                </div>
              </DialogHeader>
              <div className="relative overflow-hidden">
                <div
                  style={{
                    transform: `scale(${zoomLevel})`,
                    transition: "transform 0.2s ease-in-out",
                  }}
                  className="origin-center"
                >
                  <img
                    src={selectedCamera.feed}
                    alt={`${selectedCamera.name} live feed`}
                    className="w-full"
                  />
                </div>
                <div className="absolute bottom-4 right-4">
                  <Badge
                    variant="secondary"
                    className={`${getStatusColor(selectedCamera.status)} text-white`}
                  >
                    {selectedCamera.status.charAt(0).toUpperCase() +
                      selectedCamera.status.slice(1)}
                  </Badge>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Default cameras data for demonstration
const defaultCameras: CCTVCamera[] = [
  {
    id: "1",
    name: "City Center",
    location: "Main Square",
    status: "online",
    thumbnail:
      "https://images.unsplash.com/photo-1573108724029-4c46571d6490?w=800&q=80",
    feed: "https://images.unsplash.com/photo-1573108724029-4c46571d6490?w=1200&q=90",
  },
  {
    id: "2",
    name: "Traffic Junction",
    location: "Highway Entrance",
    status: "online",
    thumbnail:
      "https://images.unsplash.com/photo-1566288623394-377af472d81b?w=800&q=80",
    feed: "https://images.unsplash.com/photo-1566288623394-377af472d81b?w=1200&q=90",
  },
  {
    id: "3",
    name: "Central Park",
    location: "East Entrance",
    status: "maintenance",
    thumbnail:
      "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?w=800&q=80",
    feed: "https://images.unsplash.com/photo-1588714477688-cf28a50e94f7?w=1200&q=90",
  },
  {
    id: "4",
    name: "Shopping Mall",
    location: "North Entrance",
    status: "online",
    thumbnail:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
    feed: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&q=90",
  },
  {
    id: "5",
    name: "Train Station",
    location: "Main Platform",
    status: "offline",
    thumbnail:
      "https://images.unsplash.com/photo-1565118531796-763e5082d113?w=800&q=80",
    feed: "https://images.unsplash.com/photo-1565118531796-763e5082d113?w=1200&q=90",
  },
  {
    id: "6",
    name: "City Hall",
    location: "Front Entrance",
    status: "online",
    thumbnail:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
    feed: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=90",
  },
  {
    id: "7",
    name: "Public Library",
    location: "Reading Area",
    status: "online",
    thumbnail:
      "https://images.unsplash.com/photo-1568667256549-094345857637?w=800&q=80",
    feed: "https://images.unsplash.com/photo-1568667256549-094345857637?w=1200&q=90",
  },
  {
    id: "8",
    name: "Riverside Walk",
    location: "North Bridge",
    status: "online",
    thumbnail:
      "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=800&q=80",
    feed: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=1200&q=90",
  },
  {
    id: "9",
    name: "Sports Stadium",
    location: "Main Entrance",
    status: "maintenance",
    thumbnail:
      "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80",
    feed: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200&q=90",
  },
  {
    id: "10",
    name: "Industrial Zone",
    location: "Factory Entrance",
    status: "offline",
    thumbnail:
      "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=800&q=80",
    feed: "https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=1200&q=90",
  },
  {
    id: "11",
    name: "Airport Terminal",
    location: "Departure Gate",
    status: "online",
    thumbnail:
      "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=800&q=80",
    feed: "https://images.unsplash.com/photo-1556388158-158ea5ccacbd?w=1200&q=90",
  },
  {
    id: "12",
    name: "Hospital Entrance",
    location: "Emergency Room",
    status: "online",
    thumbnail:
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&q=80",
    feed: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=90",
  },
];

export default CCTVGrid;
