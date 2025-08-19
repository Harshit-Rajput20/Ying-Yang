"use client";

import Button from "@/components/Button";
import { ArrowLeft } from "lucide-react";
import router from "next/router";
import { JSX } from "react";

const VedioInfo = (): JSX.Element => {
  // Manually mocked slice data
  const slice = {
    slice_type: "big_text",
    slice_label: null,
    variation: "default",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 to-purple-200">
      {/* Animated scrolling banner */}
      <div className="bg-yellow-300 py-2 overflow-hidden whitespace-nowrap">
        <div className="marquee">
          <span className="text-black font-medium text-sm px-4">
            and don't ever forget that ★ you are a sugar bébé and don't ever forget that ★ you are a sugar bébé and
            don't ever forget that ★ you are a sugar bébé and don't ever forget that ★ you are a sugar bébé and don't
            ever forget that ★ you are a sugar bébé and don't ever forget that ★
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="space-y-8">
            {/* Cloud decoration */}
            <div className="relative">
              <div className="absolute -top-8 -left-4 w-20 h-12 bg-white rounded-full opacity-80"></div>
              <div className="absolute -top-6 -left-2 w-16 h-10 bg-white rounded-full opacity-60"></div>
              <div className="absolute -top-4 left-2 w-12 h-8 bg-white rounded-full opacity-70"></div>
            </div>

            <h1 className="text-6xl lg:text-7xl font-bold text-teal-800 leading-tight">
              Rip, drop, pour, sip!
            </h1>

            <div className="space-y-4 text-teal-800">
              <p className="text-lg leading-relaxed">
                What's a Cotton Candy Drink Glitter Bomb you ask? Our Drink Glitter Bombs are hand-spun puffs of
                flavored cotton candy with edible glitter inside that leave your drink a stunning, sparkling color and a
                touch sweeter!
              </p>

              <h2 className="text-2xl font-bold text-teal-800 mt-8">
                Simply follow these easy steps to experience the magic.
              </h2>

              <ol className="space-y-3 text-lg">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-teal-800">1.</span>
                  <span>Rip open your pouch.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-teal-800">2.</span>
                  <span>Drop the cotton candy puff into a glass.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-teal-800">3.</span>
                  <span>Pour your favorite clear and bubbly beverage on top.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-teal-800">4.</span>
                  <span>Sip! Enjoy your now sparkly and a touch sweeter beverage.</span>
                </li>
              </ol>
            </div>

            <button className="bg-cyan-300 hover:bg-cyan-200 text-black font-bold py-4 px-8 rounded-lg text-lg border-2 border-black shadow-lg">
              SHOP GLITTER BOMBS
            </button>
          </div>

          {/* Right content - Product image and badges */}
          <div className="relative">
            {/* Main product image */}
            <div className="relative bg-gradient-to-br from-yellow-200 to-orange-200 rounded-2xl p-8 border-4 border-black shadow-xl">
              <img
                src="/Screenshot 2025-08-19 163406.png"
                alt="Champagne glasses with glittery golden drinks"
                className="w-full h-auto rounded-lg"
              />

              {/* Purple badge */}
              <div className="absolute -bottom-4 left-8 bg-purple-300 border-4 border-purple-500 rounded-full p-4 shadow-lg transform rotate-3">
                <div className="text-center">
                  <div className="font-bold text-purple-800 text-sm">Prism Glitter</div>
                  <div className="font-bold text-purple-800 text-sm">Bombs</div>
                  <div className="text-xs text-purple-700 mt-1">Our best-selling</div>
                  <div className="text-xs text-purple-700">glitter bombs are</div>
                  <div className="text-xs text-purple-700">back in stock!</div>
                </div>
              </div>

              {/* Green SMS signup badge */}
              <div className="absolute -top-4 -right-4 bg-teal-700 text-white rounded-full p-4 shadow-lg transform -rotate-12">
                <div className="text-center text-xs font-bold">
                  <div>Sign up for</div>
                  <div>SMS for 10%</div>
                  <div>off your first</div>
                  <div>order!</div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-16 h-16 bg-pink-300 rounded-full opacity-70"></div>
            <div className="absolute -bottom-8 -left-8 w-12 h-12 bg-yellow-300 rounded-full opacity-80"></div>
          </div>
        </div>
      </div>

      {/* Custom styles for marquee */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .marquee {
          display: inline-block;
          white-space: nowrap;
          animation: marquee 15s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default VedioInfo;
