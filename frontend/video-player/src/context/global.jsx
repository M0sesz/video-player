import React, { useEffect } from "react";

const GlobalContext = React.createContext();

const LOADIND = "LOADING";
const SET_VIDEOS = "SET_VIDEOS";
const SET_SELECTED_VIDEO = "SET_SELECTED_VIDEO";

const reducer = (state, action) => {
  switch (action.type) {
    case LOADIND:
      return { ...state, loading: true };

    case SET_VIDEOS:
      return {
        ...state,
        loading: false,
        videos: [
          ...action.payload.map((video) => {
            return {
              ...video,
              videoUrl: `http://localhost:8000/public/videos/video/${video.filename}`,
            };
          }),
        ],
      };
    default:
      return state;
  }

  return state;
};

export const GlobalProvider = ({ children }) => {
  const initialState = {
    videos: [],
    loading: false,
  };

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const getAllVideos = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/videos");
      const data = await res.json();

      dispatch({ type: SET_VIDEOS, payload: data.videos });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllVideos();
  }, []);

  return (
    <GlobalContext.Provider value={{ ...state }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return React.useContext(GlobalContext);
};
