const EDGE_FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/gemini-proxy`;

export const askConcierge = async (prompt: string) => {
  try {
    const response = await fetch(EDGE_FUNCTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${import.meta.env.VITE_SUPABASE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    return { text: data.text, sources: data.sources || [] };
  } catch (error) {
    console.error("Concierge request error:", error);
    return {
      text: "申し訳ありません。現在AIコンシェルジュが席を外しております。時間をおいて再度お声がけください。",
      sources: [],
    };
  }
};
