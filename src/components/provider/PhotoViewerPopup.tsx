"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import {
  X,
  RotateCcw,
  Save,
  Download,
  ZoomIn,
  ZoomOut,
  RotateCw,
} from "lucide-react";

interface PhotoViewerPopupProps {
  isOpen: boolean;
  onClose: () => void;
  frontImage: string;
  sideImage: string;
  editedFrontImage?: string;
  editedSideImage?: string;
  patientName: string;
  onSaveEditedImage?: (imageData: string, viewType: "front" | "side") => void;
}

interface DrawingPoint {
  id: string;
  x: number;
  y: number;
  type: "x" | "circle" | "arrow";
  color: string;
}

export function PhotoViewerPopup({
  isOpen,
  onClose,
  frontImage,
  sideImage,
  editedFrontImage,
  editedSideImage,
  patientName,
  onSaveEditedImage,
}: PhotoViewerPopupProps) {
  const [isSideView, setIsSideView] = useState(false);
  const [drawings, setDrawings] = useState<DrawingPoint[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingTool, setDrawingTool] = useState<"x" | "circle" | "arrow">("x");
  const [drawingColor, setDrawingColor] = useState("#ff0000");
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const colors = [
    "#ff0000", // Red
    "#00ff00", // Green
    "#0000ff", // Blue
    "#ffff00", // Yellow
    "#ff00ff", // Magenta
    "#00ffff", // Cyan
    "#ffa500", // Orange
    "#800080", // Purple
  ];

  const tools = [
    { id: "x", label: "X Mark", icon: "✕" },
    { id: "circle", label: "Circle", icon: "○" },
    { id: "arrow", label: "Arrow", icon: "→" },
  ];

  // Reset state when popup opens/closes
  useEffect(() => {
    if (isOpen) {
      setDrawings([]);
      setZoom(1);
      setPan({ x: 0, y: 0 });
      setIsSideView(false);
    }
  }, [isOpen]);

  // Draw on canvas
  const drawOnCanvas = () => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    if (!canvas || !image) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw image
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    // Draw all drawings
    drawings.forEach((drawing) => {
      ctx.strokeStyle = drawing.color;
      ctx.fillStyle = drawing.color;
      ctx.lineWidth = 3;
      ctx.lineCap = "round";

      const x = drawing.x * canvas.width;
      const y = drawing.y * canvas.height;

      switch (drawing.type) {
        case "x":
          ctx.beginPath();
          ctx.moveTo(x - 10, y - 10);
          ctx.lineTo(x + 10, y + 10);
          ctx.moveTo(x + 10, y - 10);
          ctx.lineTo(x - 10, y + 10);
          ctx.stroke();
          break;
        case "circle":
          ctx.beginPath();
          ctx.arc(x, y, 15, 0, 2 * Math.PI);
          ctx.stroke();
          break;
        case "arrow":
          ctx.beginPath();
          ctx.moveTo(x - 15, y);
          ctx.lineTo(x + 15, y);
          ctx.moveTo(x + 10, y - 5);
          ctx.lineTo(x + 15, y);
          ctx.lineTo(x + 10, y + 5);
          ctx.stroke();
          break;
      }
    });
  };

  // Update canvas when drawings change
  useEffect(() => {
    drawOnCanvas();
  }, [drawings, isSideView]);

  // Handle canvas click
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const newDrawing: DrawingPoint = {
      id: Date.now().toString(),
      x,
      y,
      type: drawingTool,
      color: drawingColor,
    };

    setDrawings((prev) => [...prev, newDrawing]);
  };

  // Handle mouse down for panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 1 || (e.button === 0 && e.ctrlKey)) {
      // Middle mouse or Ctrl+click
      setIsPanning(true);
      setLastPanPoint({ x: e.clientX, y: e.clientY });
    }
  };

  // Handle mouse move for panning
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return;

    const deltaX = e.clientX - lastPanPoint.x;
    const deltaY = e.clientY - lastPanPoint.y;

    setPan((prev) => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY,
    }));

    setLastPanPoint({ x: e.clientX, y: e.clientY });
  };

  // Handle mouse up
  const handleMouseUp = () => {
    setIsPanning(false);
  };

  // Handle wheel for zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom((prev) => Math.max(0.5, Math.min(3, prev * delta)));
  };

  // Save edited image
  const handleSave = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const imageData = canvas.toDataURL("image/png");
    onSaveEditedImage?.(imageData, isSideView ? "side" : "front");
  };

  // Clear drawings
  const handleClear = () => {
    setDrawings([]);
  };

  // Reset zoom and pan
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // Download image
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `${patientName}_${
      isSideView ? "side" : "front"
    }_edited.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-900 rounded-xl w-full max-w-6xl h-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold text-white">
                  Photo Viewer - {patientName}
                </h2>
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setIsSideView(!isSideView)}
                    className="text-gray-400 hover:text-white"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    {isSideView ? "Front View" : "Side View"}
                  </Button>
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={onClose}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-800/50">
              <div className="flex items-center space-x-4">
                {/* Drawing Tools */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400">Tools:</span>
                  {tools.map((tool) => (
                    <Button
                      key={tool.id}
                      size="sm"
                      variant={drawingTool === tool.id ? "default" : "ghost"}
                      onClick={() => setDrawingTool(tool.id as any)}
                      className={`${
                        drawingTool === tool.id
                          ? "bg-blue-600 text-white"
                          : "text-gray-400 hover:text-white"
                      }`}
                    >
                      {tool.icon}
                    </Button>
                  ))}
                </div>

                {/* Colors */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400">Color:</span>
                  {colors.map((color) => (
                    <button
                      key={color}
                      className={`w-6 h-6 rounded-full border-2 ${
                        drawingColor === color
                          ? "border-white"
                          : "border-gray-600"
                      }`}
                      style={{ backgroundColor: color }}
                      onClick={() => setDrawingColor(color)}
                    />
                  ))}
                </div>

                {/* Drawing Mode Toggle */}
                <Button
                  size="sm"
                  variant={isDrawing ? "default" : "ghost"}
                  onClick={() => setIsDrawing(!isDrawing)}
                  className={isDrawing ? "bg-green-600 text-white" : ""}
                >
                  {isDrawing ? "Drawing ON" : "Drawing OFF"}
                </Button>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleClear}
                  className="text-gray-400 hover:text-white"
                >
                  Clear
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleReset}
                  className="text-gray-400 hover:text-white"
                >
                  <RotateCw className="w-4 h-4 mr-2" />
                  Reset View
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleDownload}
                  className="text-gray-400 hover:text-white"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button
                  size="sm"
                  onClick={handleSave}
                  className="bg-blue-600 text-white hover:bg-blue-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            </div>

            {/* Image Container */}
            <div className="flex-1 flex items-center justify-center p-4 overflow-hidden">
              <div
                ref={containerRef}
                className="relative w-full h-full flex items-center justify-center"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onWheel={handleWheel}
                style={{
                  cursor: isPanning
                    ? "grabbing"
                    : isDrawing
                    ? "crosshair"
                    : "grab",
                }}
              >
                <div
                  className="relative"
                  style={{
                    transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${
                      pan.y / zoom
                    }px)`,
                    transition: isPanning ? "none" : "transform 0.1s ease-out",
                  }}
                >
                  <img
                    ref={imageRef}
                    src={
                      isSideView
                        ? editedSideImage || sideImage
                        : editedFrontImage || frontImage
                    }
                    alt={`${patientName} ${isSideView ? "side" : "front"} view`}
                    className="max-w-full max-h-full object-contain"
                    onLoad={drawOnCanvas}
                  />
                  <canvas
                    ref={canvasRef}
                    className="absolute inset-0 cursor-crosshair"
                    width={imageRef.current?.naturalWidth || 800}
                    height={imageRef.current?.naturalHeight || 600}
                    onClick={handleCanvasClick}
                    style={{
                      width: "100%",
                      height: "100%",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Zoom Controls */}
            <div className="flex items-center justify-center space-x-2 p-4 border-t border-gray-700">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setZoom((prev) => Math.max(0.5, prev - 0.1))}
                className="text-gray-400 hover:text-white"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-sm text-gray-400 min-w-[60px] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setZoom((prev) => Math.min(3, prev + 0.1))}
                className="text-gray-400 hover:text-white"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
