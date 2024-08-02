import "../pages/Content.css";
import videos from "../pages/videos.json";
import React, { useEffect, useRef, useState } from "react";

const classes = [
  "video-left-2",
  "video-left-1",
  "video-center",
  "video-right-1",
  "video-right-2",
];

export default function Content() {
  const slideShowRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (slideShowRef.current) {
      for (let i = 0; i < 5; i++) {
        const element = createImageElement(videos[(currentIndex + i) % videos.length]);
        element.classList.add(classes[classes.length - 1 - i]);
        slideShowRef.current.children[0].insertAdjacentElement(
          "afterend",
          element
        );
      }
    }
  }, [currentIndex]);

  function createImageElement(video) {
    const element = document.createElement("div");
    element.className = "video video-right";

    const imageElement = document.createElement("img");
    imageElement.src = video.image;
    imageElement.alt = "Video thumbnail";

    const sideMenuElement = document.createElement("div");
    sideMenuElement.className = "side-menu";

    element.appendChild(imageElement);
    element.appendChild(sideMenuElement);

    return element;
  }

  function previous() {
    if (slideShowRef.current) {
      const children = slideShowRef.current.getElementsByClassName("video");
      if (children.length > 0) {
        const lastChild = children[children.length - 1];
        slideShowRef.current.removeChild(lastChild);

        for (let i = 0; i < children.length; i++) {
          const currentChild = children[i];

          for (let j = classes.length - 1; j >= 0; j--) {
            if (currentChild.classList.contains(classes[j])) {
              currentChild.classList.remove(classes[j]);
              currentChild.classList.add(classes[j + 1]);
            }
          }
        }

        const newChild = createImageElement(videos[(currentIndex - 1 + videos.length) % videos.length]);
        newChild.classList.add(classes[0]);
        slideShowRef.current.children[0].insertAdjacentElement(
          "afterend",
          newChild
        );

        setCurrentIndex((currentIndex - 1 + videos.length) % videos.length);
      }
    }
  }

  function next() {
    if (slideShowRef.current) {
      const children = slideShowRef.current.getElementsByClassName("video");
      if (children.length > 0) {
        const firstChild = children[0];
        slideShowRef.current.removeChild(firstChild);

        for (let i = 0; i < children.length; i++) {
          const currentChild = children[i];

          for (let j = 0; j < classes.length; j++) {
            if (currentChild.classList.contains(classes[j])) {
              currentChild.classList.remove(classes[j]);
              currentChild.classList.add(classes[j - 1]);
            }
          }
        }

        const newChild = createImageElement(videos[(currentIndex + 5) % videos.length]);
        newChild.classList.add(classes[classes.length - 1]);
        slideShowRef.current.children[
          slideShowRef.current.children.length - 1
        ].insertAdjacentElement("beforebegin", newChild);

        setCurrentIndex((currentIndex + 1) % videos.length);
      }
    }
  }

  return (
    <div id="content">
      <div ref={slideShowRef} className="video-slideshow">
        <button onClick={previous}>Previous</button>
        <button onClick={next}>Next</button>
      </div>
    </div>
  );
}
