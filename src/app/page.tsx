export default function Home() {
  return (
    <main id="home" className="justify-center items-center gap-4">
      <h1 className="text-3xl font-bold">Dev + Folio</h1>
      <p className="text-lg text-gray-500">
        Dev: ideas turned into work.<br />
        Folio: pieces collected like loose sheets of paper.
      </p>
      <a href="https://gemini.google.com/share/58943aa418a0" className="text-blue-500 underline" target="_blank">Related conversation</a>
    </main>
  );
}