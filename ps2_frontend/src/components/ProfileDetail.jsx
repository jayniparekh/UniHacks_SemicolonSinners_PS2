import { useState } from "react";
import { lookingForEmoji } from "../data/profiles";
import {
  IconX,
  IconSend,
  IconStar,
  IconPin,
  IconChevronLeft,
  IconChevronRight,
} from "../components/Icons";

export default function ProfileDetail({ profile, onClose }) {
  const [activePhoto, setActivePhoto] = useState(0);

  const prevPhoto = () =>
    setActivePhoto((p) => (p - 1 + profile.photos.length) % profile.photos.length);
  const nextPhoto = () =>
    setActivePhoto((p) => (p + 1) % profile.photos.length);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl shadow-2xl shadow-violet-200 w-full max-w-xl overflow-hidden"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Close Button ── */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-500 hover:text-violet-600 shadow-md transition-all"
        >
          <IconX size="16" />
        </button>

        {/* ── Photo Gallery ── */}
        <div className="relative bg-slate-900 overflow-hidden" style={{ aspectRatio: "4/3" }}>
          <img
            src={profile.photos[activePhoto]}
            alt={profile.name}
            className="w-full h-full object-cover transition-all duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Dot indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {profile.photos.map((_, i) => (
              <button
                key={i}
                onClick={() => setActivePhoto(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === activePhoto ? "bg-white w-6" : "bg-white/50 w-1.5"
                }`}
              />
            ))}
          </div>

          {/* Arrows */}
          <button
            onClick={prevPhoto}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all"
          >
            <IconChevronLeft />
          </button>
          <button
            onClick={nextPhoto}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-all"
          >
            <IconChevronRight />
          </button>

          {/* Online indicator */}
          {profile.online && (
            <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/30 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Online Now
            </div>
          )}
        </div>

        {/* ── Profile Details ── */}
        <div className="p-6">

          {/* Name + actions */}
          <div className="flex items-start justify-between mb-5">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                {profile.name}, {profile.age}
              </h2>
              <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <IconPin className="w-3.5 h-3.5 text-violet-400" />
                  {profile.city}
                </span>
                <span className="text-violet-200">•</span>
                <span>{profile.distance} away</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:border-red-200 hover:text-red-400 hover:bg-red-50 transition-all">
                <IconX size="18" />
              </button>
              <button className="w-10 h-10 flex items-center justify-center rounded-full border border-fuchsia-200 text-fuchsia-500 bg-fuchsia-50 hover:bg-fuchsia-100 transition-all">
                <IconStar filled />
              </button>
            </div>
          </div>

          {/* Info chips */}
          <div className="grid grid-cols-3 gap-3 mb-5">
            {[
              { e: "👤", l: "Gender",     v: profile.gender },
              { e: "💼", l: "Job",        v: profile.occupation.split(" ").slice(0, 2).join(" ") },
              { e: "📍", l: "City",       v: profile.city.split(",")[0] },
            ].map((chip) => (
              <div key={chip.l} className="bg-violet-50 rounded-xl p-3 text-center border border-violet-100">
                <div className="text-lg mb-1">{chip.e}</div>
                <p className="text-[10px] text-violet-400 font-semibold uppercase tracking-wide">
                  {chip.l}
                </p>
                <p className="text-sm text-slate-700 font-semibold truncate mt-0.5">{chip.v}</p>
              </div>
            ))}
          </div>

          {/* Bio */}
          <div className="mb-5">
            <h3 className="text-[10px] font-bold text-violet-400 uppercase tracking-widest mb-2">
              About
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">{profile.bio}</p>
          </div>

          {/* Looking for */}
          <div className="mb-5">
            <h3 className="text-[10px] font-bold text-violet-400 uppercase tracking-widest mb-2">
              Looking for
            </h3>
            <div className="flex items-center gap-2.5 bg-violet-50 border border-violet-100 rounded-xl px-4 py-3">
              <span className="text-xl">{lookingForEmoji[profile.lookingFor] || "💬"}</span>
              <span className="text-sm font-semibold text-violet-600">{profile.lookingFor}</span>
            </div>
          </div>

          {/* Interests */}
          <div className="mb-6">
            <h3 className="text-[10px] font-bold text-violet-400 uppercase tracking-widest mb-2">
              Interests
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.interests.map((tag) => (
                <span
                  key={tag}
                  className="text-sm font-medium text-violet-600 bg-violet-50 px-3 py-1.5 rounded-full border border-violet-100"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* CTA */}
          <button className="w-full py-3.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold rounded-2xl hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-violet-200 flex items-center justify-center gap-2">
            <IconSend /> Send a Connect Request
          </button>
        </div>
      </div>
    </div>
  );
}
