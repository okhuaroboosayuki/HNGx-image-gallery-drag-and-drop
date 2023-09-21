/* eslint-disable @typescript-eslint/no-unused-vars */
import "./image-gallery.scss";
import { pictures } from "../../../data";
import { useState, useRef, useLayoutEffect } from "react";
import { ComponentLoader } from "../Loader/Loader";

export const ImageGallery = () => {
  const [images, setImages] = useState<any>(pictures);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>();

  const dragImage = useRef<any>();
  const dragOverImage = useRef<any>();

  const handleDragStart = (index: number) => {
    dragImage.current = index;
  };

  const handleSort = () => {
    const _imageList = [...images];

    const draggedImageContent = _imageList.splice(dragImage.current, 1)[0];

    _imageList.splice(dragOverImage.current, 0, draggedImageContent);

    dragImage.current = null;
    dragOverImage.current = null;

    setImages(_imageList);
  };

  const handleClick = () => {
    if (searchText === "") {
      setImages(pictures);
    } else {
      const findImages =
        images?.length > 0 &&
        images?.filter(
          (image: any) =>
            image?.name.toLowerCase() === searchText?.toLowerCase()
        );

      setImages(findImages);
    }
  };

  useLayoutEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <main>
      <div className="wrapper_container">
        <div className="input_wrapper">
          <div className="input">
            <input
              type="search"
              name="search"
              id="search"
              placeholder="Type narrow, art, blur....."
              value={searchText}
              onChange={(e: any) => setSearchText(e.target.value)}
            />
          </div>
          <button onClick={handleClick}>Search</button>
        </div>
      </div>
      <section className="image_container">
        {loading ? (
          <ComponentLoader />
        ) : (
          <div className="image_wrapper">
            {images?.map((image: any, index: number) => (
              <img
                src={image.url}
                alt={image.alt}
                loading="lazy"
                key={image.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragEnter={() => (dragOverImage.current = index)}
                onDragEnd={handleSort}
                onDragOver={(e) => e.preventDefault()}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};
