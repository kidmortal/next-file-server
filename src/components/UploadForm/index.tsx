"use client";

import { useState } from "react";

export function UploadForm() {
  const [result, setResult] = useState<string[]>([]);
  const [file, setFile] = useState<File>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const res = await fetch("/api/database", {
        method: "POST",
        body: data,
      });
      // handle the error
      if (!res.ok) throw new Error(await res.text());
      res.json().then((data) => {
        setResult(data.result);
      });
    } catch (e: any) {
      // Handle errors here
      console.error(e);
    }
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {result.map((name, id) => (
          <span key={id}>{name}</span>
        ))}
      </div>
      <form onSubmit={onSubmit}>
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <input type="submit" value="Upload" />
      </form>
    </div>
  );
}
