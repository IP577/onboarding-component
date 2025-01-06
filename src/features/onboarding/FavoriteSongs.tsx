import React from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { setFavoriteSongs } from "./onboardingSlice.tsx";

const FavoriteSongsForm: React.FC = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      songs: [""],
    },
    onSubmit: (values) => {
      dispatch(setFavoriteSongs(values.songs));
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

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <h2>Your Favorite Songs</h2>
        {formik.values.songs.map((song, index) => (
          <div key={index}>
            <input
              type="text"
              value={song}
              onChange={(event) => handleSongChange(index, event)}
            />
          </div>
        ))}
        <button type="button" onClick={addSong}>
          Add Another Song
        </button>
      </div>
      <button type="submit">Next</button>
    </form>
  );
};

export default FavoriteSongsForm;
