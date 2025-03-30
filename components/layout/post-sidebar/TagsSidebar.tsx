"use client";

import { useState } from "react";

const tags = ["technology", "hehe", "hoho"];

const TagsSidebar = () => {
  const [tagsSelected, setTagsSelected] = useState<string[]>([]);

  const handleCheckboxChange = (tag: string) => {
    setTagsSelected((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]
    );
  };

  return (
    <div
      className="post-inner-contact"
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-delay="400"
    >
      <div className="post-sidebar-title">
        <h4>Categories</h4>
      </div>
      <div className="post-categories">
        <ul>
          {tags.length ? (
            tags.map((tag) => (
              <li key={tag}>
                <label className="bb-sidebar-block-item">
                  <input
                    type="checkbox"
                    checked={tagsSelected.includes(tag)}
                    onChange={() => handleCheckboxChange(tag)}
                  />
                  <p>{tag}</p>
                  <span className="checked"></span>
                </label>
              </li>
            ))
          ) : (
            <li>Danh mục trống</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default TagsSidebar;
