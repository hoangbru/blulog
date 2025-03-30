import { FormEvent, useRef, useState } from "react";
import { useRouter } from "next/navigation";

import { Button, Input } from "@/components/base";

const HeaderSearch = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  const onHandleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.currentTarget);
    const searchText = formData.get("search")?.toString();
    try {
      if (searchText) {
        router.push(`/?search=${encodeURIComponent(searchText)}`);
      }
    } catch (error: unknown) {
      const err = error as { message: string };
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="header-search">
      <form
        onSubmit={onHandleSearch}
        ref={formRef}
        className="bb-btn-group-form"
      >
        <Input
          name="search"
          className="form-control bb-search-bar"
          placeholder="Tìm kiếm ..."
        />
        <Button className="submit" disabled={isLoading}>
          <i className="ri-search-line"></i>
        </Button>
      </form>
    </div>
  );
};

export default HeaderSearch;
