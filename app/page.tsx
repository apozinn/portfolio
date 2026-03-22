"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { cpp } from "@codemirror/lang-cpp";
import { oneDark } from "@codemirror/theme-one-dark";
import { Icon } from "@iconify/react";

import AvatarImg from "@/assets/avatar.png";
import Avatar2Img from "@/assets/avatar2.png";

import dynamic from "next/dynamic";

const CodeMirror = dynamic(() => import("@uiw/react-codemirror"), {
  ssr: false,
  loading: () => <div className="h-[65vh] bg-[#1e1e1e] animate-pulse" />,
});

// ─── TYPES ────────────────────────────────────────────────────────────────────

type Language = "javascript" | "html" | "css" | "json" | "cpp";

interface CodeViewerProps {
  code: string;
  language?: Language;
  readOnly?: boolean;
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const techs = [
  "cplusplus/cplusplus-original.svg",
  "typescript/typescript-original.svg",
  "cmake/cmake-original.svg",
  "nodejs/nodejs-original-wordmark.svg",
  "html5/html5-original.svg",
  "css3/css3-original.svg",
  "nestjs/nestjs-original.svg",
  "nextjs/nextjs-original.svg",
  "mongodb/mongodb-original.svg",
  "react/react-original.svg",
  "expo/expo-original.svg",
  "socketio/socketio-original.svg",
  "javascript/javascript-original.svg",
];

const projects = [
  {
    name: "Halk",
    year: "2021",
    description:
      "Real-time chat application template built with React Native (Expo) and NestJS.",
    banner:
      "https://camo.githubusercontent.com/d40f10f4e9f4556abc5bc36e51a1810beb9525c81d9d1220795a82b39ee01c39/68747470733a2f2f692e696d6775722e636f6d2f3338634e646b612e706e67",
    logo: "https://raw.githubusercontent.com/apozinn/halk/refs/heads/master/client/assets/images/halk.png",
    url: "https://github.com/apozinn/halk",
    history:
      "Project Halk was started when I realized the lack of open-source messaging apps in the mobile ecosystem.",
  },
  {
    name: "Krafta Editor",
    year: "2023",
    description:
      "Fast, lightweight, cross-platform code editor built with C++ and wxWidgets, focused on native performance and simplicity.",
    banner: "https://i.postimg.cc/C122qcM4/image.png",
    logo: "https://raw.githubusercontent.com/apozinn/kraftaEditor/refs/heads/main/assets/images/kraftaEditor.png",
    url: "https://github.com/apozinn/kraftaEditor",
    history:
      "Born from the need for a minimal editor that prioritizes speed, maintainability, and native UX.",
  },
  {
    name: "Zegen",
    year: "2024",
    description:
      "Open-source mobile app built with Expo (React Native) that alerts users when approaching a selected destination.",
    banner:
      "https://raw.githubusercontent.com/apozinn/acordai/refs/heads/master/assets/images/screenshot.png",
    logo: "https://raw.githubusercontent.com/apozinn/acordai/refs/heads/master/assets/images/icon.png",
    url: "https://github.com/apozinn/acordai",
    history:
      "Zegen helps users avoid missing their stop by triggering a loud alarm when they get close to their destination.",
  },
];

const languageLabel: Record<Language, string> = {
  javascript: "JS_SOURCE",
  html: "HTML_MARKUP",
  css: "CSS_STYLES",
  json: "DATA_JSON",
  cpp: "CPP_CORE",
};

const dotGridStyle = {
  backgroundImage: `radial-gradient(#000 1px, transparent 1px)`,
  backgroundSize: "32px 32px",
};

// ─── NAV ──────────────────────────────────────────────────────────────────────

const Nav = () => (
  <nav className="fixed top-0 w-full z-50 bg-[#c5b896]/80 backdrop-blur-md border-b-2 border-black/10 px-6 py-4">
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <div className="font-black text-xl italic uppercase tracking-tighter">
        SAMUEL<span className="text-[#ff4d29]">.APO</span>
      </div>
      <div className="hidden md:flex gap-8 font-mono text-[10px] font-black uppercase tracking-widest">
        <a href="#about" className="hover:text-[#ff4d29] transition-colors">
          About
        </a>
        <a href="#projects" className="hover:text-[#ff4d29] transition-colors">
          Projects
        </a>
        <a href="#contact" className="hover:text-[#ff4d29] transition-colors">
          Contact
        </a>
      </div>
    </div>
  </nav>
);

// ─── HERO ─────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-screen bg-[#c5b896] flex items-center justify-center p-6 overflow-hidden font-sans selection:bg-[#ff4d29] selection:text-white">
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={dotGridStyle}
      />

      <aside className="hidden lg:flex flex-col items-center gap-6 absolute left-10 bottom-0 animate-fade-in-up">
        <div className="flex flex-col gap-5 mb-8">
          <a
            href="https://github.com/apozinn"
            className="text-black/60 hover:text-[#ff4d29] transition-all hover:-translate-y-1"
          >
            <Icon icon="simple-icons:github" width={24} />
          </a>
          <a
            href="https://linkedin.com/in/samuel-apo"
            className="text-black/60 hover:text-[#ff4d29] transition-all hover:-translate-y-1"
          >
            <Icon icon="simple-icons:linkedin" width={24} />
          </a>
          <a
            href="https://instagram.com/apozindev"
            className="text-black/60 hover:text-[#ff4d29] transition-all hover:-translate-y-1"
          >
            <Icon icon="simple-icons:instagram" width={24} />
          </a>
        </div>
        <div className="w-px h-32 bg-gradient-to-t from-black/40 to-transparent" />
      </aside>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        <div className="lg:col-span-7 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/5 border border-black/10 text-xs font-mono font-medium text-black/70">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-600"></span>
            </span>
            AVAILABLE FOR PROJECTS
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-neutral-900 leading-[1.1] tracking-tight">
            Hello, I'm <span className="text-[#ff4d29]">Samuel</span> — <br />
            <span className="text-4xl md:text-5xl opacity-90">
              known as{" "}
              <code className="font-mono bg-black/5 px-2 rounded">Apo</code> in
              the codebase.
            </span>
          </h1>

          <p className="text-lg md:text-xl text-black/70 leading-relaxed max-w-xl">
            Full-stack developer with{" "}
            <span className="font-semibold text-black underline decoration-[#ff4d29]/40 underline-offset-4">
              5 years of craft
            </span>
            . Merging the performance of{" "}
            <span className="font-mono text-sm bg-white/40 px-1 rounded">
              C++
            </span>{" "}
            with the agility of{" "}
            <span className="font-mono text-sm bg-white/40 px-1 rounded">
              TypeScript
            </span>
            .
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="https://github.com/apozinn"
              className="group flex items-center gap-2 bg-[#ff4d29] text-white px-8 py-4 rounded-xl font-bold text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
            >
              See my code
              <Icon
                icon="lucide:arrow-right"
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
            <a
              href="#about"
              className="px-8 py-4 rounded-xl font-bold text-lg border-2 border-black/20 hover:bg-black/5 transition-colors"
            >
              Know more
            </a>
          </div>
        </div>

        <div className="lg:col-span-5 relative group">
          <div className="absolute -inset-4 border-2 border-dashed border-black/10 rounded-[2rem] pointer-events-none group-hover:border-[#ff4d29]/30 transition-colors duration-500" />

          <div className="relative aspect-square overflow-hidden rounded-[1.8rem] border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,0.1)]">
            <Image
              src={AvatarImg}
              fill
              alt="Samuel Apo"
              className="object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
              priority
            />
            <div className="absolute bottom-4 left-4 right-4 flex gap-2">
              <div className="bg-white/90 backdrop-blur-md border border-black/10 px-3 py-1.5 rounded-lg text-xs font-mono font-bold shadow-sm">
                STL / Boost
              </div>
              <div className="bg-white/90 backdrop-blur-md border border-black/10 px-3 py-1.5 rounded-lg text-xs font-mono font-bold shadow-sm">
                React / Node
              </div>
            </div>
          </div>

          <div className="absolute -top-6 -right-6 bg-black text-white p-4 rounded-2xl rotate-12 shadow-xl hidden md:block group-hover:rotate-0 transition-transform duration-500">
            <p className="text-xs font-mono uppercase tracking-widest opacity-60">
              Experience
            </p>
            <p className="text-2xl font-bold">05 Years</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TECH ARSENAL ─────────────────────────────────────────────────────────────

function TechArsenal() {
  const [isNearEdge, setIsNearEdge] = useState<"left" | "right" | null>(null);

  return (
    <section className="relative w-full py-24 bg-[#c5b896] overflow-hidden border-t-2 border-black/10">
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={dotGridStyle}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/5 border border-black/10 text-[10px] font-mono font-bold tracking-[0.2em] text-black/70">
            <span className="w-2 h-2 bg-[#ff4d29] rounded-full animate-pulse shadow-[0_0_8px_#ff4d29]" />
            SYSTEM_CAPABILITIES_CORE
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-neutral-900 tracking-tighter text-center">
            Tech{" "}
            <span className="text-[#ff4d29] italic font-serif">Arsenal</span>
          </h2>
          <p className="font-mono text-sm text-black/50 max-w-md text-center">
            {"// High-performance tools for complex software architecture"}
          </p>
        </div>

        <div className="relative group/main">
          <div
            className={`absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-[#c5b896] to-transparent z-20 pointer-events-none transition-opacity duration-700 ${isNearEdge === "left" ? "opacity-0" : "opacity-100"}`}
          />
          <div
            className={`absolute inset-y-0 right-0 w-48 bg-gradient-to-l from-[#c5b896] to-transparent z-20 pointer-events-none transition-opacity duration-700 ${isNearEdge === "right" ? "opacity-0" : "opacity-100"}`}
          />

          <div
            onMouseEnter={() => setIsNearEdge("left")}
            onMouseLeave={() => setIsNearEdge(null)}
            className="absolute inset-y-0 left-0 w-1/5 z-40 cursor-w-resize"
          />
          <div
            onMouseEnter={() => setIsNearEdge("right")}
            onMouseLeave={() => setIsNearEdge(null)}
            className="absolute inset-y-0 right-0 w-1/5 z-40 cursor-e-resize"
          />

          <div className="flex overflow-hidden py-16 border-y-2 border-black/5 select-none bg-black/5 backdrop-blur-[2px]">
            <div
              className={`flex w-max gap-10 px-10 transition-all duration-700 ${
                isNearEdge === "left"
                  ? "animate-tech-scroll-fast [animation-direction:reverse]"
                  : isNearEdge === "right"
                    ? "animate-tech-scroll-fast"
                    : "animate-tech-scroll group-hover/main:[animation-play-state:paused]"
              }`}
            >
              {[...techs, ...techs, ...techs].map((icon, index) => (
                <div key={index} className="flex-shrink-0 group/card relative">
                  <div className="w-28 h-28 md:w-36 md:h-36 bg-white/40 border-2 border-black rounded-2xl flex items-center justify-center transition-all duration-500 group-hover/card:bg-white group-hover/card:border-[#ff4d29] group-hover/card:-translate-y-3 group-hover/card:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                    <div className="absolute top-2 left-3 font-mono text-[8px] text-black/30 group-hover/card:text-[#ff4d29] transition-colors">
                      MOD_{index.toString(16).toUpperCase().padStart(2, "0")}
                    </div>
                    <span className="absolute -top-12 opacity-0 group-hover/card:opacity-100 transition-all duration-300 font-mono text-[10px] font-black bg-black text-white px-3 py-1.5 rounded-lg uppercase tracking-widest z-50 pointer-events-none">
                      {icon.split("/")[0]}
                    </span>
                    <img
                      src={`https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}`}
                      alt=""
                      className="h-12 w-12 md:h-16 md:w-16 grayscale group-hover/card:grayscale-0 group-hover/card:scale-110 transition-all duration-500"
                      loading="lazy"
                    />
                    <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-black/10 group-hover/card:border-[#ff4d29]/40" />
                    <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-black/10 group-hover/card:border-[#ff4d29]/40" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-20 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border-2 border-black rounded-3xl overflow-hidden bg-white/20 backdrop-blur-md shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]">
            {[
              { label: "Experience", value: "05 YEARS", desc: "Crafting code" },
              { label: "Core_Language", value: "C++", desc: "Low-level power" },
              {
                label: "Framework",
                value: "NEXT.JS",
                desc: "Modern fullstack",
              },
              { label: "Paradigm", value: "OOP/TS", desc: "Type safety first" },
            ].map((stat, i) => (
              <div
                key={i}
                className={`p-8 flex flex-col items-center text-center ${i !== 3 ? "border-r-2 border-black/10" : ""} hover:bg-white/40 transition-colors`}
              >
                <span className="font-mono text-[10px] uppercase font-bold text-black/40 mb-2">
                  {stat.label}
                </span>
                <span className="text-3xl font-black text-black leading-none mb-2">
                  {stat.value}
                </span>
                <span className="font-mono text-[9px] text-[#ff4d29] font-bold tracking-tighter uppercase">
                  {stat.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────

function Projects() {
  return (
    <section className="relative w-full py-32 bg-[#c5b896]" id="projects">
      <div
        className="absolute inset-0 opacity-[0.1] pointer-events-none"
        style={dotGridStyle}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-24 space-y-4">
          <div className="px-3 py-1 bg-black text-white font-mono text-[10px] tracking-[0.3em] uppercase">
            Build_Log.v2
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-neutral-900 tracking-tighter">
            Selected{" "}
            <span className="italic font-serif text-[#ff4d29]">Projects</span>
          </h2>
          <div className="w-24 h-1.5 bg-black" />
        </div>

        <div className="absolute left-1/2 top-0 h-full w-1 bg-black/10 -translate-x-1/2 hidden md:block" />

        <div className="flex flex-col gap-40 relative">
          {projects.map((project, index) => {
            const isLeft = index % 2 === 0;
            return (
              <div
                key={project.name}
                className={`flex flex-col items-center md:flex-row ${isLeft ? "md:flex-row-reverse" : ""}`}
              >
                <div
                  className={`hidden md:block absolute left-1/2 h-px bg-black/20 w-24 -translate-y-1/2 ${isLeft ? "-translate-x-full" : ""}`}
                />

                <div className="absolute left-1/2 w-4 h-4 bg-[#c5b896] border-2 border-black rounded-full -translate-x-1/2 z-20 hidden md:flex items-center justify-center">
                  <div className="w-1.5 h-1.5 bg-[#ff4d29] rounded-full" />
                </div>

                <div className="w-full md:w-[45%] group">
                  <div className="relative bg-white border-2 border-black rounded-2xl overflow-hidden transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                    <div className="relative h-56 overflow-hidden border-b-2 border-black">
                      <img
                        src={project.banner}
                        alt=""
                        className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 px-3 py-1 bg-black text-white font-mono text-[10px] tracking-widest uppercase">
                        {project.year}
                      </div>
                    </div>

                    <div className="p-8">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 border-2 border-black rounded-lg p-1 bg-white shrink-0 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.1)]">
                            <img
                              src={project.logo}
                              alt=""
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <h3 className="text-3xl font-black text-neutral-900 tracking-tighter uppercase italic">
                            {project.name}
                          </h3>
                        </div>
                      </div>

                      <p className="text-neutral-700 font-medium mb-6 leading-relaxed">
                        {project.description}
                      </p>

                      <div className="bg-black/5 border-l-4 border-[#ff4d29] p-4 mb-8">
                        <p className="text-xs text-neutral-600 font-mono leading-relaxed italic">
                          {`// history: ${project.history}`}
                        </p>
                      </div>

                      <a
                        href={project.url}
                        target="_blank"
                        className="inline-flex items-center gap-3 bg-[#ff4d29] text-white border-2 border-black px-6 py-3 font-mono font-bold text-sm hover:bg-black transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
                      >
                        VIEW_REPOSITORY
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 15 15"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M3.64645 11.3536C3.45118 11.5488 3.45118 11.8654 3.64645 12.0607C3.84171 12.2559 4.15829 12.2559 4.35355 12.0607L3.64645 11.3536ZM11 4C11 3.72386 10.7761 3.5 10.5 3.5L6 3.5C5.72386 3.5 5.5 3.72386 5.5 4C5.5 4.27614 5.72386 4.5 6 4.5L10 4.5V8.5C10 8.77614 10.2239 9 10.5 9C10.7761 9 11 8.77614 11 8.5L11 4ZM4.35355 12.0607L10.8536 5.56066L10.1464 4.85355L3.64645 11.3536L4.35355 12.0607Z"
                            fill="currentColor"
                            fillRule="evenodd"
                            clipRule="evenodd"
                          />
                        </svg>
                      </a>
                    </div>

                    <div className="absolute bottom-0 right-0 w-12 h-12 bg-black/5 flex items-center justify-center font-mono text-[8px] text-black/20 border-t-2 border-l-2 border-black/5">
                      0x{index + 1}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── BIO ──────────────────────────────────────────────────────────────────────

function Bio() {
  return (
    <section
      className="relative w-full py-32 bg-[#c5b896] overflow-hidden border-t-2 border-black/10"
      id="about"
    >
      <div
        className="absolute inset-0 opacity-[0.1] pointer-events-none"
        style={dotGridStyle}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
          <div className="relative group shrink-0">
            <div className="relative w-72 h-72 md:w-[450px] md:h-[450px] border-2 border-black rounded-2xl overflow-hidden bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-transform duration-500 group-hover:-translate-y-2">
              <Image
                src={Avatar2Img}
                alt="Samuel Apo"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute bottom-0 right-0 bg-black text-white font-mono text-[10px] px-3 py-1">
                DEV_UNIT_01
              </div>
            </div>
            <div className="absolute -z-10 -bottom-4 -left-4 w-full h-full border-2 border-dashed border-black/20 rounded-2xl" />
          </div>

          <div className="flex-1 space-y-8">
            <div className="space-y-2">
              <span className="font-mono text-[#ff4d29] text-sm font-bold tracking-widest uppercase">
                {`// SYSTEM_ORIGIN: 2020`}
              </span>
              <h2 className="text-5xl md:text-6xl font-black text-neutral-900 tracking-tighter uppercase italic">
                About <span className="text-[#ff4d29]">Me</span>
              </h2>
            </div>

            <div className="space-y-6 text-lg leading-relaxed text-neutral-800 font-medium">
              <p>
                My journey began in{" "}
                <span className="bg-black text-white px-1.5 py-0.5 font-mono">
                  2020
                </span>
                , driven by technical curiosity. What started as social media
                automation bots using{" "}
                <span className="text-[#ff4d29] font-bold italic px-1">
                  JS/TS
                </span>{" "}
                evolved into architecting complex dashboards and scalable
                full-stack systems.
              </p>
              <p>
                In the mobile space, I specialized in{" "}
                <span className="underline decoration-[#ff4d29] decoration-2 underline-offset-4">
                  React Native
                </span>
                , developing everything from real-time chat engines to critical
                geolocation-based solutions.
              </p>
              <p>
                Currently, my focus converges on the raw power of{" "}
                <span className="bg-white border border-black px-1.5 py-0.5 rounded shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  C++
                </span>
                . I build native tools like{" "}
                <span className="italic">Krafta Editor</span>, applying deep
                knowledge in lexer management, memory handling, and native UI
                with wxWidgets.
              </p>
            </div>

            <div className="pt-8 border-t-2 border-black/5">
              <h4 className="font-mono text-xs font-black uppercase tracking-widest mb-4 opacity-40 italic">
                Detected_Abilities:
              </h4>
              <div className="flex flex-wrap gap-3">
                {[
                  "Low-Level Arch",
                  "Lexer Engine",
                  "JSON Parsing",
                  "Singleton Pattern",
                  "Cross-Platform UI",
                  "Memory Safety",
                  "Native Performance",
                  "System Architecture",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-white/50 border border-black/20 font-mono text-[10px] font-bold text-black uppercase rounded hover:border-[#ff4d29] hover:text-[#ff4d29] transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CODE VIEWER ──────────────────────────────────────────────────────────────

function CodeViewer({
  code,
  language = "cpp",
  readOnly = true,
}: CodeViewerProps) {
  const getLanguage = () => {
    switch (language) {
      case "cpp":
        return cpp();
      default:
        return cpp();
    }
  };

  return (
    <section className="relative w-full py-24 bg-[#c5b896] overflow-hidden border-t-2 border-black/10">
      <div
        className="absolute inset-0 opacity-[0.1] pointer-events-none"
        style={dotGridStyle}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center mb-12 space-y-3">
          <div className="px-3 py-1 bg-black text-white font-mono text-[9px] tracking-[0.3em] uppercase">
            Source_Examination
          </div>
          <h2 className="text-3xl font-black text-neutral-900 tracking-tighter italic uppercase">
            Krafta <span className="text-[#ff4d29]">Internal_Logic</span>
          </h2>
        </div>

        <div className="w-full max-w-5xl mx-auto border-2 border-black rounded-2xl overflow-hidden shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] bg-[#1e1e1e] transition-transform duration-500 hover:-translate-y-2">
          <div className="flex items-center justify-between px-6 py-4 bg-[#2b2b2b] border-b-2 border-black">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full border border-black bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full border border-black bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full border border-black bg-[#27c93f]" />
            </div>
            <div className="hidden sm:flex flex-col items-center">
              <p className="text-[11px] text-white/90 font-mono font-bold tracking-wider">
                languagesPreferences.cpp
              </p>
              <p className="text-[9px] text-[#ff4d29] font-mono font-bold uppercase tracking-tighter">
                AUTHOR: SAMUEL "APO" // ENGINE: KRAFTA_EDITOR
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-black/40 border border-white/10 rounded-md">
              <span className="w-1.5 h-1.5 bg-[#ff4d29] rounded-full animate-pulse" />
              <span className="text-[10px] font-mono font-bold text-white/70 uppercase">
                {languageLabel[language]}
              </span>
            </div>
          </div>

          <div className="relative group">
            <CodeMirror
              value={code}
              height="65vh"
              extensions={[getLanguage()]}
              theme={oneDark}
              editable={!readOnly}
              className="text-sm md:text-base border-none outline-none"
              basicSetup={{
                lineNumbers: true,
                highlightActiveLine: true,
                foldGutter: true,
                dropCursor: true,
                allowMultipleSelections: true,
                indentOnInput: true,
              }}
            />
          </div>

          <div className="flex items-center justify-between px-6 py-4 bg-[#2b2b2b] border-t-2 border-black">
            <div className="font-mono text-[9px] text-white/30 uppercase tracking-[0.2em]">
              Status: STABLE_RELEASE
            </div>
            <a
              href="https://github.com/apozinn/kraftaEditor/blob/main/src/core/languagesPreferences/languagesPreferences.cpp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-[10px] font-black text-white hover:text-[#ff4d29] transition-colors group/link"
            >
              <span className="opacity-60 group-hover/link:opacity-100 transition-opacity">
                FETCH_ON_GITHUB
              </span>
              <svg
                className="transform group-hover/link:translate-x-1 transition-transform"
                width="14"
                height="14"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.64645 11.3536C3.45118 11.5488 3.45118 11.8654 3.64645 12.0607C3.84171 12.2559 4.15829 12.2559 4.35355 12.0607L3.64645 11.3536ZM11 4C11 3.72386 10.7761 3.5 10.5 3.5L6 3.5C5.72386 3.5 5.5 3.72386 5.5 4C5.5 4.27614 5.72386 4.5 6 4.5L10 4.5V8.5C10 8.77614 10.2239 9 10.5 9C10.7761 9 11 8.77614 11 8.5L11 4ZM4.35355 12.0607L10.8536 5.56066L10.1464 4.85355L3.64645 11.3536L4.35355 12.0607Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="flex items-center gap-6 opacity-40 font-mono text-[9px] uppercase tracking-widest text-black">
            <span>Memory: STACK_ALLOCATED</span>
            <span className="w-1 h-1 bg-black rounded-full" />
            <span>Context: LEXER_STYLES_MODULE</span>
            <span className="w-1 h-1 bg-black rounded-full" />
            <span>Compiler: MSVC / GCC Compatible</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────

function Contact() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("System Message: Dispatch Successful!");
    }, 1000);
  }

  return (
    <section
      className="relative min-h-screen flex items-center justify-center py-24 bg-[#c5b896] overflow-hidden border-t-2 border-black/10"
      id="contact"
    >
      <div
        className="absolute inset-0 opacity-[0.1] pointer-events-none"
        style={dotGridStyle}
      />

      <div className="container mx-auto px-6 relative z-10 max-w-5xl">
        <div className="mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white font-mono text-[10px] tracking-widest uppercase">
            <span className="w-2 h-2 bg-[#ff4d29] rounded-full animate-pulse" />
            COMMS_CHANNEL_ESTABLISHED
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-neutral-900 tracking-tighter uppercase italic">
            Let's build <span className="text-[#ff4d29]">together</span>
          </h2>
          <p className="text-lg text-neutral-800 font-medium max-w-2xl leading-relaxed">
            Have an idea, a project, or just want to talk about software
            architecture? My digital inbox is always open for high-performance
            collaborations.
          </p>
        </div>

        <div className="relative group">
          <div className="absolute inset-0 bg-black translate-x-4 translate-y-4 rounded-2xl" />
          <div className="relative bg-white border-2 border-black rounded-2xl overflow-hidden">
            <div className="bg-black/5 border-b-2 border-black px-6 py-3 flex justify-between items-center font-mono text-[10px] font-bold text-black/40">
              <span>NEW_MESSAGE_PACKET</span>
              <span>SECURE_CONNECTION</span>
            </div>

            <form
              onSubmit={handleSubmit}
              className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="space-y-2">
                <label className="font-mono text-[10px] font-black uppercase ml-1">
                  Input_Name
                </label>
                <input
                  required
                  placeholder="IDENTIFY YOURSELF"
                  className="w-full bg-[#f4f4f4] border-2 border-black p-4 text-sm font-mono focus:bg-white focus:outline-none focus:ring-0 transition-colors placeholder:text-black/20"
                />
              </div>

              <div className="space-y-2">
                <label className="font-mono text-[10px] font-black uppercase ml-1">
                  Input_Email
                </label>
                <input
                  required
                  type="email"
                  placeholder="YOUR@ADDRESS.COM"
                  className="w-full bg-[#f4f4f4] border-2 border-black p-4 text-sm font-mono focus:bg-white focus:outline-none focus:ring-0 transition-colors placeholder:text-black/20"
                />
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="font-mono text-[10px] font-black uppercase ml-1">
                  Message_Payload
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="DESCRIBE YOUR PROJECT OR ARCHITECTURE IDEA..."
                  className="w-full bg-[#f4f4f4] border-2 border-black p-4 text-sm font-mono focus:bg-white focus:outline-none focus:ring-0 transition-colors resize-none placeholder:text-black/20"
                />
              </div>

              <div className="md:col-span-2 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#ff4d29] text-white border-2 border-black px-8 py-5 font-mono font-black text-sm uppercase tracking-widest shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {loading ? "EXECUTING_DISPATCH..." : "DISPATCH_MESSAGE"}
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 15 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1.20308 1.04312C1.00481 0.954998 0.772341 1.0048 0.627577 1.16641C0.482813 1.32802 0.458794 1.56455 0.568117 1.75196L3.90335 7.46866L0.568117 13.1854C0.458794 13.3728 0.482813 13.6093 0.627577 13.7709C0.772341 13.9325 1.00481 13.9823 1.20308 13.8942L14.2031 8.0817C14.3857 8.00035 14.5 7.81894 14.5 7.61866C14.5 7.41838 14.3857 7.23697 14.2031 7.15562L1.20308 1.04312ZM4.83285 7.61866L1.31446 1.61583L12.9806 7.11181L4.83285 7.61866ZM4.83285 7.61866L1.31446 13.6215L12.9806 8.12551L4.83285 7.61866Z"
                      fill="currentColor"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="mt-20 flex flex-col md:flex-row justify-between items-center gap-8 border-t-2 border-black/5 pt-10">
          <div className="flex gap-10">
            {[
              {
                label: "Email",
                url: "mailto:samuelsoaresmonteiro12@gmail.com",
              },
              { label: "GitHub", url: "https://github.com/apozinn" },
              {
                label: "LinkedIn",
                url: "https://www.linkedin.com/in/samuel-apo/",
              },
            ].map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                className="font-mono text-xs font-black text-black/40 hover:text-[#ff4d29] transition-colors uppercase tracking-[0.2em]"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="font-mono text-[10px] text-black/30 font-bold uppercase tracking-widest">
            © 2026 SAMUEL_APO // ALL_SYSTEMS_OPERATIONAL
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-black border-t-2 border-black">
      <div className="w-full h-1 bg-[#ff4d29]/20" />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-4 group">
            <div className="w-10 h-10 bg-[#ff4d29] border-2 border-white/10 flex items-center justify-center font-black text-white text-xl shadow-[4px_4px_0px_0px_rgba(255,77,41,0.3)] transition-transform group-hover:-translate-y-1">
              S
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-white text-[10px] tracking-[0.3em] font-bold uppercase">
                System_Operator
              </span>
              <span className="font-black text-white text-lg tracking-tighter italic uppercase">
                SAMUEL <span className="text-[#ff4d29]">APO</span>
              </span>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-12 border-x border-white/10 px-12">
            <div className="space-y-1">
              <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest">
                Environment
              </p>
              <p className="font-mono text-[10px] text-white font-bold uppercase">
                Production_V2.0
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest">
                Stack_Focus
              </p>
              <p className="font-mono text-[10px] text-white font-bold uppercase italic">
                C++ // TS // NATIVE
              </p>
            </div>
            <div className="space-y-1">
              <p className="font-mono text-[9px] text-white/40 uppercase tracking-widest">
                Status
              </p>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <p className="font-mono text-[10px] text-white font-bold uppercase">
                  Fully_Operational
                </p>
              </div>
            </div>
          </div>

          <div className="text-center md:text-right space-y-1">
            <p className="font-mono text-[10px] text-white/50 tracking-widest uppercase">
              Handcrafted in the Codebase
            </p>
            <p className="font-mono text-xs text-white font-bold">
              © {currentYear} ALL RIGHTS RESERVED
            </p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-wrap justify-center gap-x-8 gap-y-4 font-mono text-[8px] text-white/20 uppercase tracking-[0.4em]">
          <span>Build: 2025.12.19</span>
          <span>Latency: 0.02ms</span>
          <span>Deployment: SUCCESSFUL</span>
          <span>Kernel: STABLE</span>
        </div>
      </div>
    </footer>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

export default function Page() {
  const [code, setCode] = useState<string>("");

  useEffect(() => {
    (async () => {
      const url =
        "https://raw.githubusercontent.com/apozinn/kraftaEditor/main/src/core/languagesPreferences/languagesPreferences.cpp";
      const response = await fetch(url);
      const codeText = await response.text();
      setCode(codeText);
    })();
  }, []);

  return (
    <main className="bg-[#c5b896] selection:bg-[#ff4d29] selection:text-white">
      <Nav />
      <Hero />
      <TechArsenal />
      <Bio />
      <Projects />
      <CodeViewer code={code} language="cpp" readOnly />
      <Contact />
      <Footer />
    </main>
  );
}
