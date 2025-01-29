import React, { useState } from 'react';
import { LogOut, Upload, Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  AlertDialog,
  AlertDialogContent, 
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel
} from '@/components/ui/alert-dialog';

const ProfileWithUpload = ({ 
  user = {
    username: '',
    profileImage: '',
    bio: ''
  },
  userStats = {
    recipes: 0,
    likes: 0,
    followers: 0,
    following: 0
  },
  onLogout = () => {},
  onProfileUpdate = async (file) => {}
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadError('Please upload an image file');
      setShowErrorDialog(true);
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Image size should be less than 5MB');
      setShowErrorDialog(true);
      return;
    }

    try {
      setIsUploading(true);
      await onProfileUpdate(file);
    } catch (error) {
      setUploadError('Failed to upload image. Please try again.');
      setShowErrorDialog(true);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={user.profileImage || "/api/placeholder/150/150"}
                alt={`${user.username}'s profile`}
                className="rounded-full w-32 h-32 object-cover"
              />
              <label 
                htmlFor="profile-upload" 
                className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg cursor-pointer hover:bg-gray-100"
              >
                <Camera className="h-5 w-5 text-gray-600" />
                <input
                  id="profile-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                  disabled={isUploading}
                />
              </label>
              {isUploading && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                  <Upload className="h-8 w-8 text-white animate-bounce" />
                </div>
              )}
            </div>
            <h1 className="text-2xl font-bold">{user.username}</h1>
            {user.bio && <p className="text-gray-600">{user.bio}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {Object.entries(userStats).map(([key, value]) => (
              <div key={key}>
                <div className="text-xl font-bold">
                  {value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value}
                </div>
                <div className="text-gray-600 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Logout Button */}
      <Card className="bg-white">
        <CardContent className="p-6">
          <Button 
            variant="destructive" 
            className="w-full"
            onClick={onLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </CardContent>
      </Card>

      {/* Error Dialog */}
      <AlertDialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Error</AlertDialogTitle>
            <AlertDialogDescription>{uploadError}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogAction>OK</AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProfileWithUpload;
