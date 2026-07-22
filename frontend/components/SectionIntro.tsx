type SectionIntroProps = {
  eyebrow: string;
  title: string;
  summary: string;
};

export function SectionIntro({ eyebrow, title, summary }: SectionIntroProps) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm font-semibold uppercase text-emerald-900">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold text-slate-950 md:text-4xl">{title}</h2>
      <p className="mt-4 text-lg leading-8 text-slate-600">{summary}</p>
    </div>
  );
}
