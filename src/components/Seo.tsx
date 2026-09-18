import { useEffect } from "react";

type SeoProps = {
  title: string;
  description: string;
};

/**
 * Sets the document title and updates the existing meta description tag in
 * place, so each route has its own title/description without duplicating the
 * tag from index.html.
 */
export const Seo = ({ title, description }: SeoProps) => {
  useEffect(() => {
    document.title = title;

    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, [title, description]);

  return null;
};
