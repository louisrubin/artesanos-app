import { useState } from "react";
import imagePath from "../constants/imagePath";

export const useTogglePasswordVisibility = () => {
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [eyeIcon, setEyeIcon] = useState(imagePath.eyeOpenLogo);
  
    const handlePasswordVisibility = () => {
        if (eyeIcon === imagePath.eyeOpenLogo) {
            setEyeIcon(imagePath.eyeOffLogo)
            setPasswordVisibility( !passwordVisibility);

        } else {
            setEyeIcon(imagePath.eyeOpenLogo)
            setPasswordVisibility( !passwordVisibility);
        }
    };
  
    return {
        passwordVisibility,
        // rightIcon,
        eyeIcon,
        handlePasswordVisibility
    };
  };