import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { GoogleGenAI } from "npm:@google/genai@^1.35.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Client-Info, Apikey",
};

const systemInstruction = `あなたはハワイの高級コンシェルジュサービス『コクアロハ』の専属AIアシスタントです。
以下のガイドラインに従って、美しく読みやすい回答を作成してください：

1. **記号の制限**: 太字記号（**）を多用しないでください。重要なキーワードに絞るか、代わりに改行や箇条書き（・）を活用してください。
2. **視覚的な余白**: セクションごとに必ず1行空け、読み手が疲れないレイアウトにしてください。
3. **おもてなしの構造**:
   - 冒頭：丁寧な挨拶と共感の言葉
   - 本文：項目ごとに整理（適宜、ハワイを感じる絵文字を添える）
   - 結び：さらにサポートが必要な場合の案内
4. **トーン**: プロフェッショナルかつ温かみのある日本語（敬語）で。

最新の現地情報が必要な場合は、Google Searchを使用して正確なデータを提供してください。`;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("GEMINI_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({
          text: "APIキーが設定されていません。",
          sources: [],
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const { prompt } = await req.json();
    if (!prompt || typeof prompt !== "string" || prompt.trim().length === 0) {
      return new Response(
        JSON.stringify({ text: "質問を入力してください。", sources: [] }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (prompt.length > 1000) {
      return new Response(
        JSON.stringify({ text: "質問は1000文字以内でお願いします。", sources: [] }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt.trim(),
      config: {
        systemInstruction,
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "回答を生成できませんでした。";
    const sources =
      response.candidates?.[0]?.groundingMetadata?.groundingChunks
        ?.map((chunk: any) => chunk.web?.uri)
        .filter(Boolean) || [];

    return new Response(
      JSON.stringify({ text, sources }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Gemini API Error:", error);

    if (error.message?.includes("429") || error.message?.includes("quota")) {
      return new Response(
        JSON.stringify({
          text: "現在アクセスが集中しております。1分ほどおいてから再度お試しください。",
          sources: [],
        }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        text: "申し訳ありません。現在AIコンシェルジュが席を外しております。時間をおいて再度お声がけください。",
        sources: [],
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
