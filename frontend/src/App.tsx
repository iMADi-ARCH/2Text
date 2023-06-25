import { useState } from "react";
import FileUpload from "./components/FileUpload";

function App() {
  const [text, setText] = useState<string | null>(null);
  return (
    <>
      <main className="dark:bg-black dark:text-white font-sans h-full w-full min-h-screen py-20">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-5xl">Parse Anything</h1>
          <h2>
            You can parse all the supported types directly to plain text for use
            with LLMs
          </h2>
          <FileUpload setText={setText} />
          <p>{text}</p>
        </div>
      </main>
    </>
  );
}

export default App;
