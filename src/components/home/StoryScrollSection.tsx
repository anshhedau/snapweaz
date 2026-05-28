import { motion, useScroll, useTransform, useReducedMotion, MotionValue } from "framer-motion";
import { useRef } from "react";
import { Palette, Code2, Sparkles } from "lucide-react";

const chapters = [
  {
    eyebrow: "Chapter 01",
    title: "We Design",
    accent: "with intent",
    body: "Every pixel earns its place. We craft brand systems and interfaces that feel inevitable — quiet, confident, unmistakably yours.",
    Icon: Palette,
    hue: "from-accent/30 via-accent/10 to-transparent",
  },
  {
    eyebrow: "Chapter 02",
    title: "We Engineer",
    accent: "with precision",
    body: "Performance is a feature. We build resilient, fast, and scalable products with code that's a joy to maintain and a thrill to use.",
    Icon: Code2,
    hue: "from-blue-400/25 via-accent/10 to-transparent",
  },
  {
    eyebrow: "Chapter 03",
    title: "We Innovate",
    accent: "without limits",
    body: "We treat constraints as creative fuel. From AI workflows to immersive interfaces, we ship the future, one experiment at a time.",
    Icon: Sparkles,
    hue: "from-purple-400/25 via-accent/10 to-transparent",
  },
];

const ChapterPanel = ({
  index,
  total,
  scrollYProgress,
  chapter,
}: {
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  chapter: (typeof chapters)[number];
}) => {
  const start = index / total;
  const end = (index + 1) / total;
  const mid = (start + end) / 2;
  const reduce = useReducedMotion();

  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.05, end - 0.05, end],
    reduce ? [1, 1, 1, 1] : [0, 1, 1, 0],
  );
  const y = useTransform(scrollYProgress, [start, end], reduce ? [0, 0] : [60, -60]);
  const scale = useTransform(scrollYProgress, [start, mid, end], reduce ? [1, 1, 1] : [0.94, 1, 0.96]);
  const rotate = useTransform(scrollYProgress, [start, end], reduce ? [0, 0] : [-4, 4]);

  const Icon = chapter.Icon;

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 flex items-center"
    >
      <div className="container-wide w-full grid lg:grid-cols-12 gap-10 items-center">
        <motion.div style={{ y }} className="lg:col-span-6 order-2 lg:order-1">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-8 h-px bg-accent" />
            <span className="text-xs text-accent uppercase tracking-[0.3em] font-mono">
              {chapter.eyebrow}
            </span>
          </div>
          <h3 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground leading-[0.95] mb-6">
            {chapter.title}
            <br />
            <span className="text-accent italic">{chapter.accent}</span>
          </h3>
          <p className="text-lg text-foreground/50 max-w-lg leading-relaxed">{chapter.body}</p>
        </motion.div>

        <motion.div
          style={{ scale, rotate }}
          className="lg:col-span-6 order-1 lg:order-2 flex justify-center"
        >
          <div className="relative w-[280px] h-[280px] md:w-[420px] md:h-[420px]">
            <div
              className={`absolute inset-0 rounded-[2.5rem] bg-gradient-to-br ${chapter.hue} blur-3xl`}
            />
            <motion.div
              animate={reduce ? {} : { rotate: 360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 rounded-[2rem] border border-foreground/10"
            />
            <motion.div
              animate={reduce ? {} : { rotate: -360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
              className="absolute inset-10 rounded-[1.75rem] border border-accent/20"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="glass-card rounded-[1.75rem] w-40 h-40 md:w-56 md:h-56 flex items-center justify-center backdrop-blur-xl">
                <Icon size={56} className="text-accent" strokeWidth={1.2} />
              </div>
            </div>
            <span className="absolute top-2 left-2 font-mono text-[10px] text-foreground/30 uppercase tracking-[0.3em]">
              0{index + 1} / 0{total}
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const StoryScrollSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const reduce = useReducedMotion();

  const bgY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -150]);
  const progressScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative section-dark noise-overlay"
      style={{ height: `${chapters.length * 100}vh` }}
      aria-label="Our story"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Parallax background orbs */}
        <motion.div style={{ y: bgY }} className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-accent/[0.06] blur-[140px]" />
          <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-blue-500/[0.04] blur-[120px]" />
        </motion.div>

        {/* Top label */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20">
          <div className="glass-card-dark rounded-full px-5 py-2 flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] text-foreground/60 uppercase tracking-[0.3em] font-mono">
              The Studio Story
            </span>
          </div>
        </div>

        {/* Chapter panels */}
        <div className="relative h-full">
          {chapters.map((c, i) => (
            <ChapterPanel
              key={c.title}
              index={i}
              total={chapters.length}
              scrollYProgress={scrollYProgress}
              chapter={c}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 h-px bg-foreground/10 overflow-hidden">
          <motion.div
            style={{ scaleX: progressScale, transformOrigin: "left" }}
            className="h-full bg-accent"
          />
        </div>
      </div>
    </section>
  );
};
