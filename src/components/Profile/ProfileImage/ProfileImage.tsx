import "./ProfileImage.css";
import clsx from 'clsx';
import { useEffect, useState } from "react";

type ImageOptions = {
  circular?: boolean;
  border?: boolean;
};


const ProfileImage = (options: ImageOptions = {}) => {
  const [ProfilePicture, setProfilePicture] = useState<string | null>(null);
  const classes = clsx(
    'profile__header__image',
    { 'profile__header__image__circular': options.circular },
    { 'profile__header__image__border': options.border }
  );

  useEffect(() => {
    const loadProfilePicture = async () => {
      const extensions = ['png', 'jpeg', 'jpg', 'gif', 'webp', 'svg'];
      for (const extension of extensions) {
        try {
          const module = await import(`../../../assets/profile.${extension}`);
          setProfilePicture(module.default);
          break;
        } catch (error) {
          // Ignore error and try next extension
        }
      }
    };

    loadProfilePicture();
  }, []);


  return (
    <div className={classes}>
      <img src={ProfilePicture || ''} alt="Profile" />
    </div>
  );
};

export default ProfileImage;
