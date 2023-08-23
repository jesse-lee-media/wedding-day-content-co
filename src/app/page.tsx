export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center p-4">
      <section className="flex max-w-fit flex-col items-center gap-6 rounded-3xl border-2 border-[#77786a] bg-[#d6ef46] p-9 text-center text-[#191e00]">
        <div>
          <h1 className="mb-3 text-5xl">Jesse Lee Media</h1>
          <p className="uppercase text-[#47483b]/90">Content Creation</p>
        </div>
        <a href="mailto:jesse@jesselee.media">jesse@jesselee.media</a>
      </section>
    </main>
  );
}
