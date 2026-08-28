"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { useIntlayer } from "next-intlayer";
import { MotionItem, MotionStagger } from "./motion";

type Project = {
  nameKey?: "projectShowcaseSite";
  name?: string;
  images?: string[];
  intervalMs?: number;
};

const PROJECTS: Project[] = [
  {
    name: "Initer",
    images: ["/projects/initer.png", "/projects/initer2.png"],
    intervalMs: 3000,
  },
  {
    name: "KYC Marketplace",
    images: [
      "/projects/merlineapp2.png",
      "/projects/merlineapp3.png",
      "/projects/merlineapp4.png",
    ],
    intervalMs: 4000,
  },
  {
    name: "Merline App",
    images: ["/projects/merlineapp.png"],
  },
  {
    name: "SP Renova",
    images: [
      "/projects/Screenshot_17.png",
      "/projects/Screenshot_18.png",
      "/projects/Screenshot_19.png",
      "/projects/Screenshot_20.png",
      "/projects/Screenshot_21.png",
    ],
    intervalMs: 5000,
  },
  {
    nameKey: "projectShowcaseSite",
    images: [
      "/projects/merl.png",
      "/projects/merl2.png",
      "/projects/merl3.png",
    ],
    intervalMs: 5000,
  },
  {
    name: "ReTech",
    images: [
      "/projects/Screenshot_22.png",
      "/projects/Screenshot_201.png",
      "/projects/Screenshot_211.png",
    ],
    intervalMs: 6000,
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

function ProjectImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="relative mb-4 aspect-[16/10] w-full overflow-hidden rounded-sm bg-black">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 640px) 33vw, 50vw"
        className="object-cover object-top"
      />
    </div>
  );
}

function ProjectImageSlideshow({
  images,
  intervalMs,
  previewAlt,
}: {
  images: string[];
  intervalMs: number;
  previewAlt: (index: number) => string;
}) {
  const [displayIndex, setDisplayIndex] = useState(0);
  const [incomingIndex, setIncomingIndex] = useState<number | null>(null);

  useEffect(() => {
    if (images.length <= 1 || incomingIndex !== null) return;

    const timer = window.setTimeout(() => {
      setIncomingIndex((displayIndex + 1) % images.length);
    }, intervalMs);

    return () => clearTimeout(timer);
  }, [displayIndex, images.length, incomingIndex, intervalMs]);

  return (
    <div className="relative mb-4 aspect-[16/10] w-full overflow-hidden rounded-sm bg-black">
      <Image
        src={images[displayIndex]}
        alt={previewAlt(displayIndex + 1)}
        fill
        sizes="(min-width: 640px) 33vw, 50vw"
        className="object-cover object-top"
      />

      {incomingIndex !== null ? (
        <motion.div
          key={incomingIndex}
          className="absolute inset-0 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease }}
          onAnimationComplete={() => {
            setDisplayIndex(incomingIndex);
            setIncomingIndex(null);
          }}
        >
          <Image
            src={images[incomingIndex]}
            alt={previewAlt(incomingIndex + 1)}
            fill
            sizes="(min-width: 640px) 33vw, 50vw"
            className="object-cover object-top"
          />
        </motion.div>
      ) : null}
    </div>
  );
}

export function MarketingProjectsSection() {
  const content = useIntlayer("home");

  const projects = useMemo(
    () =>
      PROJECTS.map((project) => ({
        ...project,
        name: project.nameKey ? content[project.nameKey] : project.name!,
      })),
    [content],
  );

  return (
    <section className="border-t border-black/20 bg-white text-black">
      <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8 sm:py-24">
        <MotionStagger
          className="grid grid-cols-2 items-stretch gap-px bg-black/20 sm:grid-cols-3"
          stagger={0.06}
        >
          {projects.map((project) => {
            const previewAlt = (index: number) =>
              content.projectPreviewAlt
                .replace("{name}", project.name)
                .replace("{n}", String(index));

            return (
              <MotionItem key={project.name} className="h-full">
                <div className="flex h-full min-h-[clamp(16rem,32vw,22rem)] flex-col justify-end bg-white p-5 sm:p-6">
                  {project.images?.length ? (
                    project.intervalMs && project.images.length > 1 ? (
                      <ProjectImageSlideshow
                        images={project.images}
                        intervalMs={project.intervalMs}
                        previewAlt={previewAlt}
                      />
                    ) : (
                      <ProjectImage
                        src={project.images[0]}
                        alt={previewAlt(1)}
                      />
                    )
                  ) : null}
                  <p className="t-hero line-clamp-2 text-[clamp(0.9375rem,2vw,1.25rem)] leading-[1.1] text-black">
                    {project.name}
                  </p>
                </div>
              </MotionItem>
            );
          })}
        </MotionStagger>
      </div>
    </section>
  );
}
