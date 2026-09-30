import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Upload, Code2, Link, CheckCircle2, AlertCircle, Sparkles, MapPin, Award } from "lucide-react";
import { Quest } from "../types";
import { LOCATIONS } from "../data/locations";
import { resizeImageFile } from "../utils/storage";

interface ProofModalProps {
  quest: Quest | null;
  onClose: () => void;
  onSubmit: (questId: string, proof?: string) => void;
}

export const ProofModal: React.FC<ProofModalProps> = ({ quest, onClose, onSubmit }) => {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [codeOrLink, setCodeOrLink] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!quest) return null;

  const location = LOCATIONS.find((loc) => loc.id === quest.locationId);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select an image file (PNG, JPG, WebP).");
      return;
    }

    try {
      setIsProcessing(true);
      setError(null);
      const resizedBase64 = await resizeImageFile(file, 800);
      setPhotoPreview(resizedBase64);
    } catch (err) {
      console.error(err);
      setError("Failed to process image residue. Try another image.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quest.proofType === "photo" && !photoPreview) {
      setError("Verification image is required to seal this mission.");
      return;
    }
    if (quest.proofType === "code" && !codeOrLink.trim()) {
      setError("Please provide code snippet residue or GitHub commit link.");
      return;
    }

    const proof =
      quest.proofType === "photo"
        ? photoPreview || undefined
        : quest.proofType === "code"
        ? codeOrLink.trim()
        : undefined;

    onSubmit(quest.id, proof);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: 20, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-lg w-full bg-[#14141F] border border-[#2A2A3D] rounded-2xl p-6 sm:p-7 shadow-2xl overflow-hidden my-8"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#A855F7] mb-1">
                <span>Verification Rite</span>
                <span>·</span>
                <span>{quest.grade}</span>
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl text-white tracking-wide leading-none">
                SEAL MISSION: {quest.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Context bar */}
          <div className="flex items-center justify-between p-3 rounded-lg bg-[#0B0B12] border border-[#2A2A3D] text-xs text-neutral-300 mb-5">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-neutral-400" />
              <span>{location ? location.name : quest.locationId}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#F5B301] font-mono font-semibold">+{quest.xp} XP</span>
              <span className="text-neutral-500">|</span>
              <span className="text-neutral-400 line-clamp-1">{quest.bounty}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Proof Input Section based on proofType */}
            {quest.proofType === "photo" && (
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                  Upload Visual Exorcism Residue (Photo)
                </label>
                <div className="relative border-2 border-dashed border-[#2A2A3D] hover:border-[#7C3AED]/60 rounded-xl p-4 text-center transition-colors bg-[#0B0B12]/50">
                  {photoPreview ? (
                    <div className="space-y-3">
                      <div className="relative max-h-56 overflow-hidden rounded-lg border border-[#7C3AED]/40">
                        <img
                          src={photoPreview}
                          alt="Verification preview"
                          className="w-full h-48 object-cover"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setPhotoPreview(null)}
                        className="text-xs text-rose-400 hover:text-rose-300 underline"
                      >
                        Remove and select another photo
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer flex flex-col items-center justify-center py-6">
                      <Upload className="w-8 h-8 text-[#7C3AED] mb-2" />
                      <span className="text-sm font-medium text-neutral-200">
                        Click to upload photo evidence
                      </span>
                      <span className="text-xs text-neutral-500 mt-1">
                        Camera capture or gallery image (automatically compressed)
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                        disabled={isProcessing}
                      />
                    </label>
                  )}
                </div>
              </div>
            )}

            {quest.proofType === "code" && (
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-neutral-300 mb-2">
                  Code Residue or Repository Link
                </label>
                <div className="space-y-2">
                  <textarea
                    rows={4}
                    value={codeOrLink}
                    onChange={(e) => setCodeOrLink(e.target.value)}
                    placeholder="// Paste snippet or https://github.com/..."
                    className="w-full p-3 rounded-lg bg-[#0B0B12] border border-[#2A2A3D] text-sm font-mono text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-[#7C3AED]"
                  />
                  <span className="text-[11px] text-neutral-500 block">
                    Submit your terminal output, git commit SHA, or GitHub repository URL.
                  </span>
                </div>
              </div>
            )}

            {quest.proofType === "none" && (
              <div className="p-4 rounded-xl bg-purple-950/20 border border-[#7C3AED]/30 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#A855F7] shrink-0 mt-0.5" />
                <div className="text-xs text-neutral-300 leading-relaxed">
                  <strong className="text-white block font-medium">Honor-System Cursed Cleansing</strong>
                  This grade mission requires no visual proof. By submitting, you affirm that the ritual at {location?.name || "campus"} has been executed faithfully.
                </div>
              </div>
            )}

            {error && (
              <div className="flex items-center gap-2 p-3 rounded-lg bg-rose-950/40 border border-rose-800/40 text-rose-300 text-xs">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isProcessing}
                className="px-6 py-2.5 rounded-lg bg-[#7C3AED] hover:bg-[#6D28D9] active:scale-[0.98] text-white font-heading text-lg tracking-wider transition-all shadow-[0_0_20px_rgba(124,58,237,0.4)] disabled:opacity-50 cursor-pointer"
              >
                {isProcessing ? "TRANSMUTING..." : "SEAL MISSION & CLAIM XP"}
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
