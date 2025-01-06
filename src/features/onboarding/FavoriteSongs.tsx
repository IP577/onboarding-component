import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { setFavoriteSongs } from "./onboardingSlice.tsx";
import { useNavigate } from "react-router-dom";

const FavoriteSongs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favoriteSongs = useSelector(
    (state: RootState) => state.onboarding.favoriteSongs
  );

  const formik = useFormik({
    initialValues: { songs: favoriteSongs },
    onSubmit: (values) => {
      dispatch(setFavoriteSongs(values.songs));
      navigate("/onboarding/step3");
    },
  });

  const addSong = () => {
    formik.setFieldValue("songs", [...formik.values.songs, ""]);
  };

  const updateSong = (index: number, value: string) => {
    const updatedSongs = [...formik.values.songs];
    updatedSongs[index] = value;
    formik.setFieldValue("songs", updatedSongs);
  };

  return (
    <div>
      <h1>Favorite Songs</h1>
      <form onSubmit={formik.handleSubmit}>
        {formik.values.songs.map((song, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder={`Song ${index + 1}`}
              value={song}
              onChange={(e) => updateSong(index, e.target.value)}
            />
          </div>
        ))}
        <button type="button" onClick={addSong}>
          Add Song
        </button>
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default FavoriteSongs;
