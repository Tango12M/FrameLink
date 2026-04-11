import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Clock, Send, Info, User, Download, UploadCloud } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getComments,
  addComment,
  getSceneDetails,
  updateSceneVideo,
} from "../services/dashboard.api";

const VideoReview = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const videoRef = useRef(null);
  const uploadInputRef = useRef(null);

  const [currentVideoTime, setCurrentVideoTime] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);
  const [scene, setScene] = useState(null);
  const [replaceProgress, setReplaceProgress] = useState(0);
  const [isReplacing, setIsReplacing] = useState(false);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, "0");
    const seconds = Math.floor(timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const statusLabel = {
    raw: "Raw Footage",
    editing: "Editing",
    review: "In Review",
    approved: "Ready",
  };

  useEffect(() => {
    const fetchScene = async () => {
      if (!id) return;
      try {
        const data = await getSceneDetails(id);
        if (data.success) {
          setScene(data.scene || data);
        } else {
          throw new Error(data.message || "Scene not found");
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || error.message || "Failed to load scene",
        );
        navigate(-1);
      }
    };
    fetchScene();
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      if (!id) return;
      try {
        const data = await getComments(id);
        const fetchedComments = data.comments || data;
        setComments(
          Array.isArray(fetchedComments)
            ? fetchedComments.map((comment) => ({
                ...comment,
                id: comment._id,
                time: comment.timestamp || 0,
                displayTime: formatTime(comment.timestamp || 0),
                user:
                  comment.userId?.name || comment.userId?.email ||
                  (comment.userId && comment.userId.toString ? comment.userId.toString().slice(-6) : null) ||
                  "Reviewer",
              }))
            : [],
        );
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            error.message ||
            "Failed to load comments",
        );
      }
    };

    fetchComments();
  }, [id]);

  const handleSeek = (time) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      videoRef.current.pause();
    }
  };

  const handleDownloadVideo = () => {
    if (!scene?.videoUrl) {
      toast.error("No video available to download.");
      return;
    }
    const link = document.createElement("a");
    link.href = scene.videoUrl;
    const safeSceneTitle = scene && scene.title
      ? scene.title.replace(new RegExp("[^a-z0-9]", "gi"), "_")
      : "scene-video";
    link.download = safeSceneTitle + ".mp4";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReplaceClick = () => {
    if (uploadInputRef.current) {
      uploadInputRef.current.click();
    }
  };

  const handleFileSelect = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.type !== "video/mp4" && !file.name.toLowerCase().endsWith(".mp4")) {
      toast.error("Only MP4 videos can be uploaded.");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File too large. Maximum size is 10MB.");
      return;
    }

    const formData = new FormData();
    formData.append("video", file);
    setIsReplacing(true);
    setReplaceProgress(0);

    try {
      const data = await updateSceneVideo(id, formData, {
        onUploadProgress: (progressEvent) => {
          const total = progressEvent.total || progressEvent?.nativeEvent?.total || 1;
          const percent = Math.min(
            100,
            Math.round((progressEvent.loaded * 100) / total),
          );
          setReplaceProgress(percent);
        },
      });

      if (data.success) {
        setScene(data.scene || data);
        toast.success(data.message || "Video updated successfully");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Failed to replace video",
      );
    } finally {
      setIsReplacing(false);
      setReplaceProgress(0);
      if (uploadInputRef.current) {
        uploadInputRef.current.value = "";
      }
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    if (!id) return;

    try {
      const data = await addComment({
        sceneId: id,
        text: newComment,
        timestamp: Math.floor(currentVideoTime),
      });

      const created = data.comment || data;
      const nextComment = {
        ...created,
        id: created._id,
        user:
          created.userId?.name || created.userId?.email ||
          (created.userId && created.userId.toString ? created.userId.toString().slice(-6) : null) ||
          "You",
        time: created.timestamp || Math.floor(currentVideoTime),
        displayTime: formatTime(created.timestamp || Math.floor(currentVideoTime)),
      };

      setComments((prev) => [...prev, nextComment].sort((a, b) => a.time - b.time));
      setNewComment("");
      toast.success(data.message || "Comment added successfully");
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message || "Failed to add comment",
      );
    }
  };

  return (
    <div className="flex-1 h-[calc(100vh-4rem)] overflow-hidden flex flex-col bg-neutral-100 dark:bg-[#0a0a0a] animate-[fadeIn_0.3s_ease-out]">
      
      {/* Top Header */}
      <div className="h-16 flex shrink-0 items-center px-6 border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-[#111]/80 backdrop-blur-xl">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Pipeline
        </button>
        <div className="mx-auto flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <h2 className="text-sm font-medium text-neutral-900 dark:text-white">Active Review Session</h2>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadVideo}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#111] px-4 py-2 text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
          >
            <Download className="w-4 h-4" /> Download
          </button>
          <button
            onClick={handleReplaceClick}
            disabled={isReplacing}
            className="inline-flex items-center gap-2 rounded-full bg-neutral-900 dark:bg-white px-4 py-2 text-sm font-medium text-white dark:text-neutral-900 hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <UploadCloud className="w-4 h-4" /> {isReplacing ? "Uploading..." : "Upload New Version"}
          </button>
          <input
            ref={uploadInputRef}
            type="file"
            accept="video/mp4"
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>
      </div>

      {isReplacing && (
        <div className="h-2 w-full bg-neutral-200 dark:bg-neutral-900 overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all duration-200"
            style={{ width: replaceProgress + "%" }}
          />
        </div>
      )}

      <div className="flex-1 p-6 flex flex-col items-center bg-neutral-100 dark:bg-[#0a0a0a] overflow-y-auto">
          <div className="w-full max-w-5xl flex flex-col gap-6">
            
            {/* Video Player Card */}
            <div className="w-full rounded-3xl overflow-hidden shadow-2xl bg-black border border-neutral-200 dark:border-neutral-800 relative group">
              <video 
                ref={videoRef}
                controls 
                onTimeUpdate={(e) => setCurrentVideoTime(e.target.currentTime)}
                className="w-full aspect-video outline-none"
                src={
                  scene?.videoUrl
                    ? scene.videoUrl
                    : "https://www.w3schools.com/html/mov_bbb.mp4"
                }
              />
            </div>

            {/* Video Details Card */}
            <div className="bg-white dark:bg-[#111] border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 md:p-8 shadow-sm">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2.5 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider rounded-md">
                      {statusLabel[scene?.status] || "Raw Footage"}
                    </span>
                    <span className="text-sm text-neutral-500 font-medium">ID: {id || "1775935"}</span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-medium text-neutral-900 dark:text-white tracking-tight">
                    {scene?.title || "Review Footage"}
                  </h1>
                </div>
              </div>
              
              <div className="h-px w-full bg-neutral-100 dark:bg-neutral-800 my-6"></div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-3">
                  <div className="flex items-center gap-2 text-neutral-900 dark:text-white font-medium">
                    <Info className="w-4 h-4 text-neutral-500" /> Project Description
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                    {scene && scene.title
                      ? 'Review the scene titled "' + scene.title + '" and add timecoded comments as needed.'
                      : "Review the selected footage and leave comments connected to the current scene."}
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center border border-neutral-200 dark:border-neutral-800">
                      <User className="w-4 h-4 text-neutral-500" />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 font-medium">Uploaded By</p>
                      <p className="text-sm font-medium text-neutral-900 dark:text-white">
                        {scene?.uploadedBy ? "Team Member" : "Review Team"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center border border-neutral-200 dark:border-neutral-800">
                      <Clock className="w-4 h-4 text-neutral-500" />
                    </div>
                    <div>
                      <p className="text-xs text-neutral-500 font-medium">Uploaded On</p>
                      <p className="text-sm font-medium text-neutral-900 dark:text-white">
                        {scene?.createdAt
                          ? new Date(scene.createdAt).toLocaleString()
                          : "Today, 2:45 PM"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: Comments */}
        <div className="w-full lg:w-[400px] bg-white dark:bg-[#111] border-l border-neutral-200 dark:border-neutral-800 flex flex-col h-full shrink-0 shadow-[-10px_0_30px_rgba(0,0,0,0.02)] z-10">
          
          <div className="p-5 border-b border-neutral-200 dark:border-neutral-800 shrink-0 bg-neutral-50/50 dark:bg-neutral-900/20">
            <h3 className="font-medium text-neutral-900 dark:text-white">Timecoded Notes</h3>
            <p className="text-sm text-neutral-500">{comments.length} comments</p>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {comments.map((comment) => (
              <div key={comment.id} className="group">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-medium text-neutral-900 dark:text-white">{comment.user}</span>
                  <button 
                    onClick={() => handleSeek(comment.time)}
                    className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800/50 px-2 py-1 rounded-md hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 dark:hover:text-white transition-all shadow-sm"
                  >
                    <Clock className="w-3 h-3" /> {comment.displayTime}
                  </button>
                </div>
                <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed bg-neutral-50 dark:bg-neutral-900/50 p-3 rounded-xl border border-neutral-100 dark:border-neutral-800/50">
                  {comment.text}
                </p>
              </div>
            ))}
          </div>

          <div className="p-5 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#111] shrink-0">
            
            {/* --- UPDATED: Form input now has a timecode badge inside it! --- */}
            <form 
              onSubmit={handleAddComment} 
              className="relative flex items-center bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl transition-shadow focus-within:ring-2 focus-within:ring-neutral-900 dark:focus-within:ring-white"
            >
              {/* Live Timecode Badge */}
              <div className="pl-3 pr-2 py-3 flex items-center justify-center border-r border-neutral-200 dark:border-neutral-800 shrink-0">
                <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-neutral-500 dark:text-neutral-400 bg-neutral-200/50 dark:bg-neutral-800/50 px-2 py-1 rounded-md">
                  <Clock className="w-3 h-3" />
                  {formatTime(currentVideoTime)}
                </div>
              </div>

              {/* Text Input */}
              <input
                type="text"
                placeholder="Add a note..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full bg-transparent pl-3 pr-12 py-3.5 text-sm text-neutral-900 dark:text-white focus:outline-none placeholder:text-neutral-400"
              />

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={!newComment.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-lg disabled:opacity-50 transition-all hover:scale-105 active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default VideoReview;