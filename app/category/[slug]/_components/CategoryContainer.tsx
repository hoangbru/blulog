"use client";

import { Fragment, useCallback, useEffect, useState } from "react";

import { Breadcrumb, PreLoader } from "@/components/template";
import ListPosts from "./ListPosts";

import { ResponseApi } from "@/types/response";
import { fetcher } from "@/utils/fetcher";
import { Category } from "@/types/category";

interface CategoryContainerProps {
  slug: string;
}

type CategoryResponse = ResponseApi<{
  category: Category;
}>;

const CategoryContainer = ({ slug }: CategoryContainerProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [category, setCategory] = useState<Category | null>(null);

  const fetchCategory = useCallback(async () => {
    try {
      const { data }: CategoryResponse = await fetcher(
        `/api/categories/${slug}`
      );
      if (data) setCategory(data.category);
    } catch (error) {
      console.error("Error fetching category:", error);
    } finally {
      setIsLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    fetchCategory();
  }, [fetchCategory]);

  if (isLoading) return <PreLoader />;

  return (
    <Fragment>
      <Breadcrumb destination="Danh mục" title={category?.name || "N/A"} />
      <ListPosts categoryId={category?.id} />
    </Fragment>
  );
};

export default CategoryContainer;
