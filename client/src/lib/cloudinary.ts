// Cloudinary Image Upload Utility

interface CloudinaryConfig {
  cloudName: string;
  uploadPreset: string;
  folder: string;
}

// Initialize with your Cloudinary credentials
const CLOUDINARY_CONFIG: CloudinaryConfig = {
  cloudName: process.env['REACT_APP_CLOUDINARY_CLOUD_NAME'] || 'your-cloud-name',
  uploadPreset: process.env['REACT_APP_CLOUDINARY_UPLOAD_PRESET'] || 'your-preset',
  folder: 'home/zovio/staff',
};

interface UploadResult {
  success: boolean;
  url?: string;
  publicId?: string;
  error?: string;
  message?: string;
}

/**
 * Upload image to Cloudinary
 * @param file - Image file to upload
 * @param subfolder - Optional subfolder within the main folder
 * @returns Upload result with URL and public ID
 */
export async function uploadToCloudinary(
  file: File,
  subfolder: string = ''
): Promise<UploadResult> {
  try {
    // Validate file
    if (!file) {
      return {
        success: false,
        error: 'No file provided',
      };
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return {
        success: false,
        error: 'File size must be less than 5MB',
      };
    }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed',
      };
    }

    // Prepare form data
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
    formData.append('cloud_name', CLOUDINARY_CONFIG.cloudName);

    // Add folder path
    const folderPath = subfolder
      ? `${CLOUDINARY_CONFIG.folder}/${subfolder}`
      : CLOUDINARY_CONFIG.folder;
    formData.append('folder', folderPath);

    // Add tags for organization
    formData.append('tags', 'zovio-worker');

    // Upload to Cloudinary
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.status}`);
    }

    const data = await response.json();

    return {
      success: true,
      url: data.secure_url,
      publicId: data.public_id,
      message: 'Image uploaded successfully',
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Upload failed',
    };
  }
}

/**
 * Upload worker image specifically
 * @param file - Image file to upload
 * @param workerId - ID of the worker
 * @returns Upload result
 */
export async function uploadWorkerImage(
  file: File,
  workerId: string
): Promise<UploadResult> {
  return uploadToCloudinary(file, `workers/${workerId}`);
}

/**
 * Get optimized image URL from Cloudinary
 * @param publicId - Public ID from Cloudinary
 * @param options - Transformation options
 * @returns Optimized image URL
 */
export function getOptimizedImageUrl(
  publicId: string,
  options: {
    width?: number;
    height?: number;
    quality?: 'auto' | 'good' | 'best';
    format?: 'auto' | 'webp' | 'jpg' | 'png';
  } = {}
): string {
  const {
    width = 400,
    height = 400,
    quality = 'auto',
    format = 'auto',
  } = options;

  const transformation = [
    `w_${width}`,
    `h_${height}`,
    'c_fill',
    `q_${quality}`,
    `f_${format}`,
  ].join(',');

  return `https://res.cloudinary.com/${CLOUDINARY_CONFIG.cloudName}/image/upload/${transformation}/${publicId}`;
}

/**
 * Delete image from Cloudinary
 * @param publicId - Public ID of image to delete
 * @returns Delete result
 */
export async function deleteFromCloudinary(
  publicId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Note: This requires backend implementation for security
    // Frontend should not delete directly from Cloudinary
    // This is a placeholder - implement on backend instead
    console.warn('Image deletion should be done from backend for security');
    return { success: false, error: 'Use backend API for deletion' };
  } catch (error) {
    console.error('Delete error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Delete failed',
    };
  }
}

/**
 * Generate thumbnail URL
 * @param publicId - Public ID from Cloudinary
 * @returns Thumbnail image URL
 */
export function getThumbnailUrl(publicId: string): string {
  return getOptimizedImageUrl(publicId, {
    width: 150,
    height: 150,
    quality: 'good',
    format: 'auto',
  });
}

/**
 * Generate profile picture URL
 * @param publicId - Public ID from Cloudinary
 * @returns Profile picture URL
 */
export function getProfilePictureUrl(publicId: string): string {
  return getOptimizedImageUrl(publicId, {
    width: 300,
    height: 300,
    quality: 'best',
    format: 'webp',
  });
}
