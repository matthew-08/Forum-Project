import React, { useEffect, useState } from 'react';
import { Audio } from 'react-loader-spinner';
import styles from './gifselector.module.css';
import cancel from './cancel.svg';

export default function GifSelector({ handleUserImageSelection, closeSelector }) {
  const [gifs, setGifs] = useState([]);
  const [input, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getInitialGifs = async () => {
      await fetch('https://api.giphy.com/v1/gifs/trending?api_key=zMJ34TsDqi8jsxQ3HqQlr611aYHW1jfH&tag=&limit=5')
        .then((res) => res.json().then((r) => {
          const { data } = r;
          const mappedImages = data.map((d) => d.images.fixed_height.url);
          setGifs(mappedImages);
        }));
    };
    getInitialGifs();
  }, []);

  const searchGif = (a) => {
    setLoading(true);
    const getUserGif = async () => {
      await fetch(`https://api.giphy.com/v1/gifs/search?api_key=zMJ34TsDqi8jsxQ3HqQlr611aYHW1jfH&tag=&limit=5&q=${a}`)
        .then((res) => res.json().then((r) => {
          const { data } = r;
          const mappedImages = data.map((d) => d.images.fixed_height.url);
          setGifs(mappedImages);
          setLoading(false);
        }));
    };
    getUserGif();
  };

  return (
    <div
      className="overlay"
    >
      <div className={styles.container}>
        <button
          type="button"
          onClick={() => closeSelector()}
          className={styles['cancel-button']}
        >
          <img src={cancel} alt="cancel" />
        </button>
        <h2>Search for a GIF:</h2>
        <input
          type="text"
          placeholder="Search for a gif..."
          onChange={(e) => {
            setInputValue(e.target.value);
            searchGif(e.target.value);
          }}
        />
        {loading ? (
          <Audio
            height="10%"
            width="10%"
            radius="9"
            color="green"
            ariaLabel="loading"
            wrapperStyle
            wrapperClass
          />
        )
          : (
            <div
              className={styles['img-container']}
            >
              {gifs && gifs.map((gif) => (
                <button
                  type="button"
                  onClick={(e) => handleUserImageSelection(gif)}
                >
                  <img src={`${gif}`} alt="gif" />
                </button>
              ))}

            </div>
          )}
      </div>
    </div>
  );
}
