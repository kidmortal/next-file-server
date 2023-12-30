"use client";

import { Button } from "@chakra-ui/react";
import { useState } from "react";

type Props = {
  uploadPath: string;
  label: string;
  onSuccess?: () => void;
  onError?: () => void;
};

export function UploadForm(props: Props) {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch(props.uploadPath, {
        method: "POST",
        body: data,
      });
      // handle the error
      if (!res.ok) throw new Error(await res.text());
      res.json().then((data) => {
        setLoading(false);
        props.onSuccess?.();
      });
    } catch (e: any) {
      // Handle errors here
      props.onError?.();
      setLoading(false);
      console.error(e);
    }
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <Button
          isLoading={loading}
          loadingText="Importando"
          colorScheme="blue"
          type="submit"
          value="Upload"
        >
          Importar {props.label}
        </Button>
      </form>
    </div>
  );
}
