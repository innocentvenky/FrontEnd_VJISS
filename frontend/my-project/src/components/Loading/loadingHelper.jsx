let setLoadingRef = null;

// React registers setter here
export const registerLoadingSetter = (setter) => {
  setLoadingRef = setter;
};

// Axios/services read setter from here
export const getLoadingSetter = () => setLoadingRef;
