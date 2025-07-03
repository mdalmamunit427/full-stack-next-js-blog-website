"use client";

import React, { useEffect, useRef } from "react";
import "quill/dist/quill.snow.css";
import type QuillType from "quill";

type QuillEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export default function QuillEditor({ value, onChange, placeholder }: QuillEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<QuillType | null>(null);

  useEffect(() => {
    // Dynamically import Quill only on client
    import("quill").then((QuillModule) => {
      const Quill = QuillModule.default;

      if (!editorRef.current) return;

      // Initialize Quill only once
      if (!quillRef.current) {
        quillRef.current = new Quill(editorRef.current, {
          theme: "snow",
          placeholder: placeholder || "Write something...",
          modules: {
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline"],
              ["image", "code-block"],
              [{ list: "ordered" }, { list: "bullet" }],
              ["clean"],
            ],
          },
        });

        // Listen for changes and notify parent
        quillRef.current.on("text-change", () => {
          const html = editorRef.current!.querySelector(".ql-editor")!.innerHTML;
          onChange(html);
        });
      }

      // Set initial content if empty
      if (value && quillRef.current.root.innerHTML !== value) {
        quillRef.current.root.innerHTML = value;
      }
    });
  }, [onChange, placeholder, value]);

  // Keep updating editor content if value changes from outside
  useEffect(() => {
    if (quillRef.current && value !== quillRef.current.root.innerHTML) {
      quillRef.current.root.innerHTML = value || "";
    }
  }, [value]);

  return (
    <div>
      <div ref={editorRef} className="min-h-[200px] border border-gray-300 rounded" />
    </div>
  );
}
