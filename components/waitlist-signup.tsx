"use client";

import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";

export function WaitlistSignup() {
  const [email, setEmail] = useState(""); // email state
  const [isPending, setIsPending] = useState(false); // loading state

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // prevent page reload
    console.log("Submitted email:", email);
    setIsPending(true);

    // Simulate async work
    setTimeout(() => {
      setIsPending(false);
      setEmail(""); // clear input after submit
    }, 1000);
  };
  return (
    <div className="w-full max-w-xl mx-auto p-8 flex flex-col justify-between min-h-screen">
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <div className="mb-6 flex items-center">
          <img src="/icon.png" alt="Dijkstra Logo" className="w-32 h-32 mr-3" />

          <div className="flex flex-col">
            <h1 className="text-5xl sm:text-6xl pb-1 font-semibold text-gray-100">
              Dijkstra
            </h1>
            <span className="text-sm sm:text-base p-2 text-gray-400 -mt-1">
              HQ - Admin Console
            </span>
          </div>
        </div>

        <div>
          <p className="text-lg sm:text-sm mb-8 text-gray-300">
            Want to hire the best technical talent without the hassle of
            interviewing them? Feel free to send us your business email, and our
            sales team will get back to you shortly.
          </p>
        </div>

        {/* <div className="w-full">
          <form onSubmit={handleSubmit} className="w-full space-y-4 mb-8">
            <div className="flex overflow-hidden rounded-xl bg-white/5 p-1 ring-1 ring-white/20 focus-within:ring-2 focus-within:ring-blue-500">
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-describedby="email-error"
                className="w-full border-0 bg-transparent text-white placeholder:text-gray-400 focus:ring-0 focus:border-transparent focus-visible:border-transparent focus:outline-none active:ring-0 active:outline-none focus-visible:ring-0 focus-visible:outline-none active:border-transparent focus-visible:ring-offset-0"
              />
              <Button
                type="submit"
                disabled={isPending}
                className="bg-black hover:bg-gray-800 text-white font-semibold px-4 rounded-xl transition-all duration-300 ease-in-out focus:outline-none w-[120px]"
              >
                {isPending ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  "Get Notified"
                )}
              </Button>
            </div>
          </form>
        </div> */}

        <div className="mt-4">
          <p className="text-gray-400">
            Have an account?{" "}
            <a
              href="/login"
              className="text-gray-400 hover:text-gray-300 underline"
            >
              Login
            </a>
          </p>
        </div>

        {/* <div className="mt-16">
          <h3 className="text-center text-gray-400 text-sm uppercase mb-10 tracking-wider">
            Our Members have gone on to work in the following companies:
          </h3>
          <div className="flex justify-center items-center gap-8">
            {[
              { src: "/logos/CERN.png", alt: "CERN" },
              { src: "/logos/microsoft.png", alt: "Microsoft" },
              { src: "/logos/hsbc.png", alt: "HSBC" },
              { src: "/logos/hyperface.png", alt: "Hyperface" },
              { src: "/logos/balkan.png", alt: "Balkan" },
              { src: "/logos/HP.png", alt: "HP" },
              { src: "/logos/phillips.png", alt: "Phillips" },
              { src: "/logos/pwc.png", alt: "PWC" },
              { src: "/logos/signify.png", alt: "Signify" },
            ].map((logo, idx) => (
              <img
                key={idx}
                src={logo.src || "/placeholder.svg"}
                alt={logo.alt}
                className="h-12 w-auto filter grayscale hover:grayscale-0 transition duration-300 ease-in-out opacity-70 hover:opacity-100"
              />
            ))}
          </div>
        </div> */}
      </div>

      {/* <div className="pt-8 flex justify-center space-x-6">
        <SocialIcon
          href="https://x.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X (formerly Twitter)"
          icon={<XIcon className="w-6 h-6" />}
        />
        <SocialIcon
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          icon={<InstagramIcon className="w-6 h-6" />}
        />
        <SocialIcon
          href="https://discord.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Discord"
          icon={<DiscordIcon className="w-6 h-6" />}
        />
        <SocialIcon
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          icon={<FacebookIcon className="w-6 h-6" />}
        />
        <SocialIcon
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          icon={<LinkedInIcon className="w-6 h-6" />}
        />
      </div> */}
    </div>
  );
}
