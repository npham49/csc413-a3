"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"

export default function Home() {
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [stories, setStories] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleClick = async () => {
    console.log("clicked");
    setIsDisplayed(true);
    setIsLoading(true);
    const res = await fetch("http://localhost:3000/stories")
    const data = await res.json()
    setStories(data)
    setIsLoading(false);
  }
  useEffect(() => {
    console.log("stories", stories);
  }, [stories]);
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <div className="text-2xl font-bold text-center">
        Get the theme of the outfits?
      </div>
      <Button className="text-xl w-[200px] h-[40px]" onClick={handleClick}>Generate Theme!</Button>
      {/* When the stories is loading, displaying loading indicator */}
      {isDisplayed && isLoading && <div>Loading...</div>}
      {isDisplayed && !isLoading && stories && (
        <div className="w-[30%] bg-black text-white rounded-lg" style={{ whiteSpace: "pre-line" }}>
          <div className="p-10">
            {stories.split('\n').map((line, index) => {
              if (line.match(/^\d+\./)) {
                return <div key={index} className="font-bold">{line}</div>;
              }
              return <div key={index}>{line}</div>;
            })}
          </div>
        </div>
      )}
    </div>
  );
}
