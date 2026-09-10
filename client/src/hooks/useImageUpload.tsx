import { useState, useCallback } from 'react';
import { uploadToCloudinary, UploadResult } from '@/lib/cloudinary';

interface UseImageUploadState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
  uploadedUrl: string | null;
  uploadedPublicId: string | null;
  progress: number;
}

interface UseImageUploadReturn extends UseImageUploadState {
  upload: (file: File, subfolder?: string) => Promise<UploadResult>;
  reset: () => void;
  setProgress: (progress: number) => void;
}

/**
 * Custom hook for image uploads to Cloudinary
 * Handles loading, error, and success states
 */
export function useImageUpload(): UseImageUploadReturn {
  const [state, setState] = useState<UseImageUploadState>({
    isLoading: false,
    error: null,
    success: false,
    uploadedUrl: null,
    uploadedPublicId: null,
    progress: 0,
  });

  const upload = useCallback(
    async (file: File, subfolder: string = ''): Promise<UploadResult> => {
      setState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
        success: false,
        progress: 0,
      }));

      try {
        // Simulate progress
        const progressInterval = setInterval(() => {
          setState((prev) => ({
            ...prev,
            progress: Math.min(prev.progress + 10, 90),
          }));
        }, 200);

        const result = await uploadToCloudinary(file, subfolder);

        clearInterval(progressInterval);

        if (result.success) {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            success: true,
            uploadedUrl: result.url || null,
            uploadedPublicId: result.publicId || null,
            progress: 100,
          }));
        } else {
          setState((prev) => ({
            ...prev,
            isLoading: false,
            error: result.error || 'Upload failed',
            progress: 0,
          }));
        }

        return result;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Upload failed';
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
          progress: 0,
        }));

        return {
          success: false,
          error: errorMessage,
        };
      }
    },
    []
  );

  const reset = useCallback(() => {
    setState({
      isLoading: false,
      error: null,
      success: false,
      uploadedUrl: null,
      uploadedPublicId: null,
      progress: 0,
    });
  }, []);

  const setProgress = useCallback((progress: number) => {
    setState((prev) => ({
      ...prev,
      progress: Math.min(Math.max(progress, 0), 100),
    }));
  }, []);

  return {
    ...state,
    upload,
    reset,
    setProgress,
  };
}

/**
 * Custom hook for uploading worker images specifically
 */
export function useWorkerImageUpload() {
  const imageUpload = useImageUpload();

  const uploadWorkerImage = useCallback(
    async (file: File, workerId: string) => {
      return imageUpload.upload(file, `workers/${workerId}`);
    },
    [imageUpload]
  );

  return {
    ...imageUpload,
    uploadWorkerImage,
  };
}
