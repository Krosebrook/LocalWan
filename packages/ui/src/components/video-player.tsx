import * as React from "react";
import { Download, Play, Pause } from "lucide-react";
import { cn } from "../lib/utils";
import { Button } from "./button";

export interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  onDownload?: () => void;
}

export const VideoPlayer = React.forwardRef<HTMLVideoElement, VideoPlayerProps>(
  ({ src, poster, className, onDownload }, ref) => {
    const [isPlaying, setIsPlaying] = React.useState(false);
    const videoRef = React.useRef<HTMLVideoElement>(null);

    React.useImperativeHandle(ref, () => videoRef.current!);

    const togglePlay = () => {
      if (videoRef.current) {
        if (isPlaying) {
          videoRef.current.pause();
        } else {
          videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
      }
    };

    return (
      <div className={cn("relative group", className)}>
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          className="w-full h-full rounded-lg"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          controls
        />
        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="secondary" size="icon" onClick={togglePlay}>
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          {onDownload && (
            <Button variant="secondary" size="icon" onClick={onDownload}>
              <Download className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    );
  }
);
VideoPlayer.displayName = "VideoPlayer";
