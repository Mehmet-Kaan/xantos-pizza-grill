import { useState } from "react";
import "../styles/lazyLoad.css";
import type { Product } from "../hooks/types";

type Props = {
  item: Product;
  addClassToContainer?: string;
  addClassToImg?: string;
  large?: boolean;
  badge?: boolean;
  onImageStatusChange?: (exists: boolean) => void;
};

export const LazyImage = ({
  item,
  addClassToContainer = "",
  addClassToImg = "",
  large = false,
  badge = false,
  onImageStatusChange,
}: Props) => {
  const [loaded, setLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  return (
    <div className={`${addClassToContainer} ${imgError && "transparent-bg"}`}>
      {!loaded && !imgError && <div className="lazy-image-placeholder" />}

      <img
        src={
          large
            ? `./assets/menuItems/Large/${item.imageLarge}`
            : `./assets/menuItems/${item.image}`
        }
        alt={item.name}
        loading="lazy"
        className={`${addClassToImg} ${loaded ? "loaded" : ""}`}
        onLoad={() => {
          setLoaded(true);
          onImageStatusChange?.(true);
        }}
        onError={(e) => {
          (e.target as HTMLImageElement).style.display = "none";
          setImgError(true);
          onImageStatusChange?.(false);
        }}
      />
      {badge && (
        <div className="modal-price-badge">
          {item.size && "Fra"} {item.price.toFixed(2)} kr
        </div>
      )}
    </div>
  );
};
