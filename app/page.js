import Image from "next/image";

/**
 * Revalidate every 60 seconds (ISR)
 * Good for SEO + performance
 */
export const revalidate = 60;

export default async function Home() {
  const API_URL = process.env.API_URL;

  if (!API_URL) {
    throw new Error("API_URL is not defined");
  }

  const res = await fetch(`${API_URL}/posts?_limit=3`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }

  const posts = await res.json();

  return (
    <main className="max-w-3xl mx-auto py-16 px-6">
      <Image
        src="/next.svg"
        alt="Next.js logo"
        width={100}
        height={20}
        priority
      />

      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-6">Latest Posts</h2>

        <ul className="space-y-6">
          {posts.map(post => (
            <li key={post.id} className="border rounded-lg p-4">
              <h3 className="text-lg font-medium">{post.title}</h3>
              <p className="text-sm mt-2 text-gray-600">{post.body}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
