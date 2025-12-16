import Image from "next/image";


export default async function Home() {
  const API_URL = process.env.API_URL;

  // ✅ Simulated server-side data fetch
  const res = await fetch(
    `${API_URL}/posts?_limit=3`,
    {
      // Next.js caching options
      cache: "no-store", // always fetch fresh data
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const posts = await res.json();

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col gap-10 py-32 px-16 bg-white dark:bg-black">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />

        {/* ✅ Render fetched data */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-black dark:text-zinc-50">
            Latest Posts
          </h2>

          <ul className="space-y-4">
            {posts.map((post) => (
              <li
                key={post.id}
                className="rounded-lg border p-4 dark:border-zinc-800"
              >
                <h3 className="font-medium text-lg">{post.title}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {post.body}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <p className="text-sm text-zinc-500">SERVER API URL: {API_URL}</p>
      </main>
    </div>
  );
}
