"use client";
import React, { useEffect, useRef } from "react";

import "quill/dist/quill.snow.css";
import type QuillType from "quill";

type QuillEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const QuillEditor = ({ value, onChange, placeholder }: QuillEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<QuillType | null>(null);

  useEffect(() => {
    import("quill").then((QuillModule) => {
      const Quill = QuillModule.default;
      if (!editorRef.current) return;

      if (!quillRef.current) {
        quillRef.current = new Quill(editorRef.current, {
          modules: {
            toolbar: [
              [{ header: [1, 2, 3, 4,  false] }],
              ["bold", "italic", "underline"],
              ["image", "code-block"],
               [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
                 ['clean']   
            ],
          },
          placeholder: "Write something...",
          theme: "snow", 
        });

        quillRef.current.on("text-change", () => {
            const html = editorRef.current!.querySelector(".ql-editor")!.innerHTML;
            onChange(html);
        })
      }

    //   set initial content if empty
    if(value && quillRef.current.root.innerHTML !== value) {
        quillRef.current.root.innerHTML = value;
    }

    });
  }, [onChange, placeholder, value]);

  useEffect(() => {
    if(quillRef.current && value !== quillRef.current.root.innerHTML) {
        quillRef.current.root.innerHTML = value || "";
    }
  }, [value])


  return (
    <div>
      <div ref={editorRef} className="min-h-[200px] border border-gray-300 rounded"/>
    </div>
  );
};

export default QuillEditor;
