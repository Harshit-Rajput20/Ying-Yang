"use client"
import { X } from "lucide-react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
 
import { runThreeCleanup } from "@/lib/threeCleanup"
import { useRouter  } from "next/navigation";

interface PrelaunchPopupProps {
  onClose: () => void
  isVisible: boolean
}

export const PrelaunchPopup = ({ onClose, isVisible }: PrelaunchPopupProps) => {

    const router = useRouter();
  useGSAP(() => {
    if (isVisible) {
      const tl = gsap.timeline()
      tl.fromTo(".popup-overlay", { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" })
        .fromTo(
          ".popup-content",
          { scale: 0.8, opacity: 0, y: 50 },
          { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" },
          "-=0.1",
        )
        .from(".popup-elements > *", { opacity: 0, y: 20, stagger: 0.1, duration: 0.4 }, "-=0.2")
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div className="popup-overlay fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="popup-content relative max-w-md w-full bg-gradient-to-br from-yellow-300 via-yellow-400 to-orange-400 rounded-2xl shadow-2xl border-4 border-orange-500/30">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-2 -right-2 bg-sky-950 text-white rounded-full p-2 hover:bg-sky-800 transition-colors shadow-lg z-10"
        >
          <X size={20} />
        </button>

        <div className="popup-elements p-8 text-center">
          {/* Popup image */}
          <div className="mb-6">
            <img
              src="435642-PEMLBJ-405.jpg"
              alt="Prelaunch Offer"
              className="mx-auto w-48 h-48 object-contain drop-shadow-lg"
            />
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-black uppercase text-sky-950 mb-3 leading-tight">🎉 Prelaunch Special!</h2>

          {/* Subheading */}
          <h3 className="text-xl font-semibold text-orange-600 mb-4">Early Bird Exclusive</h3>

          {/* Body text */}
          <p className="text-sky-950 font-medium mb-6 leading-relaxed">
            Be among the first to experience the <span className="font-black text-orange-600">Art of YingYang</span>!
            <br />
            Get <span className="font-bold text-sky-950">25% OFF</span> your first order + FREE shipping.
          </p>

          {/* CTA Button */}
          <div className="space-y-3">
            <button
             className="w-full bg-sky-950 hover:bg-sky-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
                            onClick={() => {
                              runThreeCleanup(); // ✅ Clean up before navigation
                              router.push("/all-products");
                            }}
                            
                          >
                            Claim Your Offer
                          </button>
             

            <button
              onClick={onClose}
              className="text-sky-950/70 hover:text-sky-950 font-medium text-sm transition-colors"
            >
              Maybe later
            </button>
          </div>

          {/* Limited time indicator */}
          <div className="mt-4 text-xs text-sky-950/60 font-medium">⏰ Limited time offer - Don't miss out!</div>
        </div>
      </div>
    </div>
  )
}
