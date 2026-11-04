import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export type GuideTopic = 'sizing' | 'care' | 'assay' | null;

interface GuideModalProps {
  topic: GuideTopic;
  onClose: () => void;
  onSwitchTopic: (topic: Exclude<GuideTopic, null>) => void;
}

export const GuideModal: React.FC<GuideModalProps> = ({
  topic,
  onClose,
  onSwitchTopic,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && topic) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [topic, onClose]);

  if (!topic) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Jewellery Sizing and Purity Guide"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#171310]/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl bg-[#FAF7F2] rounded-xl border border-[#DFD5C0] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 border-b border-[#E6DEC8] bg-[#F2ECE1] flex items-center justify-between gap-4">
          <div className="flex items-center gap-1 p-1 bg-[#E6DEC8]/60 rounded-lg overflow-x-auto">
            {(
              [
                { id: 'sizing', label: 'Bangle & Ring Chart' },
                { id: 'assay', label: 'BIS Hallmark & Purity' },
                { id: 'care', label: 'Jewellery Care' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSwitchTopic(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  topic === tab.id
                    ? 'bg-[#171310] text-[#F5EFE6]'
                    : 'text-[#5C5044] hover:text-[#1E1915]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close guide"
            className="w-9 h-9 rounded-full flex items-center justify-center text-[#5C5044] hover:text-[#1E1915] hover:bg-[#E6DEC8] transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 sm:p-8 text-sm text-[#4A4036] leading-relaxed">
          {topic === 'sizing' && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-semibold text-[#1E1915]">
                  Indian Bangle & Kada Size Chart
                </h3>
                <p className="mt-1 text-xs text-[#756553]">
                  Measure the inner diameter of an existing well-fitting bangle across the centre in millimetres.
                </p>
                <table className="mt-3 w-full text-left text-xs border-collapse tabular-nums">
                  <thead>
                    <tr className="border-b border-[#E6DEC8] text-[#756553]">
                      <th className="py-2 font-medium">Bangle Size</th>
                      <th className="py-2 font-medium">Inner Diameter</th>
                      <th className="py-2 font-medium">Inner Circumference</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EDE6D6] text-[#1E1915]">
                    <tr>
                      <td className="py-2 font-semibold">2-2</td>
                      <td className="py-2">54.0 mm (2.12 in)</td>
                      <td className="py-2">16.96 cm</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold">2-4</td>
                      <td className="py-2">57.2 mm (2.25 in)</td>
                      <td className="py-2">17.96 cm</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold">2-6</td>
                      <td className="py-2">60.3 mm (2.37 in)</td>
                      <td className="py-2">18.95 cm</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold">2-8</td>
                      <td className="py-2">63.5 mm (2.50 in)</td>
                      <td className="py-2">19.95 cm</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="pt-4 border-t border-[#E6DEC8]">
                <h4 className="text-xs font-semibold text-[#1E1915]">
                  Indian Ring Sizes
                </h4>
                <p className="mt-1 text-xs text-[#6B5E50] tabular-nums">
                  Indian 10 = 15.9 mm (US 5.5) · Indian 12 = 16.5 mm (US 6) · Indian 14 = 17.3 mm (US 7) · Indian 16 = 18.1 mm (US 8). Unsure of your size? Mention it on WhatsApp and we will guide you over a 1-minute photo check.
                </p>
              </div>
            </div>
          )}

          {topic === 'assay' && (
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-semibold text-[#1E1915]">
                BIS Hallmarking & Transparent Billing
              </h3>
              <p>
                Every 22K (916) and 18K (750) gold creation carries the mandatory 6-digit alphanumeric BIS HUID laser hallmark, verifiable directly in the official BIS Care app prior to dispatch.
              </p>
              <p>
                We charge strictly on **Net Gold Weight**—gemstone, polki, and pearl weights are deducted transparently from gross weight. All solitaire and diamond pieces include original GIA or IGI laboratory certificates.
              </p>
            </div>
          )}

          {topic === 'care' && (
            <div className="space-y-4">
              <h3 className="font-serif text-2xl font-semibold text-[#1E1915]">
                Caring for Jadau Polki, 22K Gold & Pearls
              </h3>
              <p>
                Keep uncut polki kundan sets and natural pearl jewellery away from direct perfume sprays, hairsprays, and moisture. Gently wipe pieces with a dry soft muslin cloth after festive wear and store them individually in your velvet-lined Suhag Jewellers box.
              </p>
              <p>
                Solid 22K gold bangles and 18K diamond rings may be brought to our showroom anytime for complimentary steam polishing and prong inspection.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
