import { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const TokenNotifier = ({ setBlur }) => {
  
  const hasNotified = useRef(false);

  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");

      if (!token) {
        if (!hasNotified.current) {
          toast.warning("You are not logged in!", {
            position: "top-right",
            autoClose: 2000,
            closeButton: false,
          
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
            closeOnClick: true, // allows user to click and dismiss
  onClose: () => {
    setBlur(false);
    hasNotified.current = false;
  },
            
          });

          hasNotified.current = true;
          setBlur(true); // 🔥 blur ON

          setTimeout(() => {
            hasNotified.current = false;
            setBlur(false); // 🔥 blur OFF
          }, 3000);
        }
      } else {
        hasNotified.current = false;
        setBlur(false); // 🔥 unblur
      }
    };

    checkToken();
    const interval = setInterval(checkToken, 20000);

    return () => clearInterval(interval);
  }, [setBlur]);

  return <ToastContainer />;
};

export default TokenNotifier;
