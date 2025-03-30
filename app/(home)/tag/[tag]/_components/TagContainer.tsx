"use client";

import { Fragment } from "react";

import { Breadcrumb } from "@/components/template";
import ListPosts from "./ListPosts";

interface TagContainerProps {
  tag: string;
}

const TagContainer = ({ tag }: TagContainerProps) => {

  return (
    <Fragment>
      <Breadcrumb destination="Tags" title={tag || "N/A"} />
      <ListPosts tag={tag} />
    </Fragment>
  );
};

export default TagContainer;
