import React, { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";

const QuillEditor = ({ setProjectEvaluation }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (quillRef.current) {
      return;
    }

    quillRef.current = new Quill(editorRef.current, {
      theme: "snow",
      modules: {
        toolbar: [
          [{ list: "ordered" }, { list: "bullet" }],
          ["bold", "italic", "underline"],
          [{ header: [1, 2, false] }],
          ["blockquote", "code-block"],
        ],
      },
    });

    quillRef.current.on("text-change", () => {
      setProjectEvaluation((prev) => {
        return {
          ...prev,
          feedback: quillRef.current.root.innerHTML,
        };
      });
    });
  }, []);

  return <div ref={editorRef} className="border rounded-lg h-28"></div>;
};

export default QuillEditor;
