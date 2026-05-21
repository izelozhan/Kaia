interface DummyJsonQuote {
  id: number;
  quote: string;
  author: string;
}

export async function fetchRandomQuote(): Promise<{ content: string; author: string }> {
  const res = await fetch("https://dummyjson.com/quotes/random");
  if (!res.ok) throw new Error(`Failed to fetch quote: ${res.status}`);
  const data: DummyJsonQuote = await res.json();
  return { content: data.quote, author: data.author };
}