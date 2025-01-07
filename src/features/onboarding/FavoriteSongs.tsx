import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFavoriteSongs } from "./onboardingSlice.tsx";
import { RootState } from "../../store/store.ts";
import "../../css/features/onboarding/FavoriteSongs.css"; // Import the CSS file

const FavoriteSongsForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favoriteSongs = useSelector(
    (state: RootState) => state.onboarding.favoriteSongs
  );

  const formik = useFormik({
    initialValues: {
      songs: favoriteSongs.length ? favoriteSongs : [""],
    },
    onSubmit: (values) => {
      dispatch(setFavoriteSongs(values.songs));
      navigate("/onboarding/step3");
    },
  });

  const addSong = () => {
    formik.setFieldValue("songs", [...formik.values.songs, ""]);
  };

  const handleSongChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newSongs = [...formik.values.songs];
    newSongs[index] = event.target.value;
    formik.setFieldValue("songs", newSongs);
  };

  const handleBack = () => {
    navigate("/onboarding/step1");
  };

  return (
    <form onSubmit={formik.handleSubmit} className="favorite-songs-form">
      <h1 className="form-title">Your Favorite Songs</h1>
      {formik.values.songs.map((song, index) => (
        <div key={index} className="song-item">
          <label htmlFor={`song-${index}`} className="form-label">
            Song {index + 1}
          </label>
          <input
            id={`song-${index}`}
            type="text"
            className="form-input"
            value={song}
            onChange={(event) => handleSongChange(index, event)}
          />
        </div>
      ))}
      <button type="button" className="add-song-button" onClick={addSong}>
        Add Another Song
      </button>
      <div className="button-group">
        <button
          type="button"
          className="form-button back-button"
          onClick={handleBack}
        >
          Back
        </button>
        <button type="submit" className="form-button">
          Next
        </button>
      </div>
    </form>
  );
};

export default FavoriteSongsForm;
