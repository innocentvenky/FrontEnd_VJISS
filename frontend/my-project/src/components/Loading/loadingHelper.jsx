let setLoadingRef = null;

export const registerLoadingSetter = (setLoading) => {
  setLoadingRef = setLoading;
};

export const getLoadingSetter = () => setLoadingRef;
