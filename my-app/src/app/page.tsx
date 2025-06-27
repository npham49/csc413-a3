"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"

// type Story = { upper: string; lower: string };

export default function Home() {
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [stories, setStories] = useState("");
  const handleClick = async () => {
    console.log("clicked");
    const res = await fetch("http://localhost:3000/stories")
    const data = await res.json()
    setStories(data)
    setIsDisplayed(!isDisplayed);

  }
  useEffect(() => {
    console.log("stories", stories);
  }, [stories]);
  return (
    <div>
      <h1>Hello World</h1>
      <Button onClick={handleClick}>Click here!</Button>
      {isDisplayed && stories && <div>{stories}</div>}
    </div>
  );
}
