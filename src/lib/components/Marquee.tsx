export default function Marquee({ text }: { text: string }) {
  const duplicatedText = new Array(4).fill(text).join(' ') + ' ';

  return (
    <div className="relative flex overflow-x-scroll whitespace-nowrap motion-safe:overflow-x-hidden">
      <h1 className="whitespace-nowrap text-8xl motion-safe:animate-marquee">{duplicatedText}</h1>
      <h1 aria-hidden="true" className="whitespace-nowrap text-8xl motion-safe:animate-marquee">
        {duplicatedText}
      </h1>
    </div>
  );
}
